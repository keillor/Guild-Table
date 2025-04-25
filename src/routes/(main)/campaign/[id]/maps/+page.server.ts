import { PRIVATE_SUPABASE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { GetCampaignByIdAdmin, UpdateCampaign } from '$lib/api/campaign_manage.js';
import { client } from '$lib/api/db.js';
import { inviteUser } from '$lib/api/user_manage.js';
import { createClient } from '@supabase/supabase-js';
import { error, fail } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const load = async ({ params, locals: { safeGetSession } }) => {
	let session = await safeGetSession();
	session = session.session;

	const campaign = await GetCampaignByIdAdmin(session, params.id);
	if (campaign) {
		return { campaign };
	}
	throw error(404, "Looks like this campaign doesn't exist.");
};

export const actions = {
	addMap: async ({ request, params, locals: { safeGetSession, supabase } }) => {
		const session = (await safeGetSession()).session;
		const formData = await request.formData();
		const mapName = formData.get('name')?.toString();
		const mapFile = formData.get('map'); // Get the uploaded file

		const maxMapSize = 10000000; // 10 MB

		// Validate map name
		if (!mapName || mapName.trim() === '') {
			return fail(400, { error: 'Map name is required.' });
		}

		// Validate map file
		if (!mapFile || !(mapFile instanceof File)) {
			return fail(400, { error: 'Map file is required.' });
		}
		if (mapFile.size > maxMapSize) {
			return fail(400, { error: 'Map file is too large. It must be 10 MB or less.' });
		}
		if (!mapFile.type.startsWith('image/')) {
			return fail(400, { error: 'Invalid file type. Only image files are allowed.' });
		}

		// Fetch the campaign
		const campaign = await GetCampaignByIdAdmin(session, params.id);
		if (!campaign) {
			throw error(404, 'Campaign not found.');
		}

		// Upload the map file to Supabase storage
		const mapId = new ObjectId().toString(); // Generate a unique ID for the map
		const { data, error: uploadError } = await supabase.storage
			.from('character-avatars')
			.upload(mapId, mapFile, { upsert: true, cacheControl: '3600' });

		if (uploadError) {
			console.error('Upload error:', uploadError);
			throw error(500, 'Failed to upload map.');
		}

		// Create a new map object with the uploaded file URL
		const newMap = {
			id: mapId,
			name: mapName,
			url: data.path // Store the file path or URL
		};

		// Add the new map object to the mapIds array
		const updatedMapIds = [...campaign.mapIds, newMap];

		// Update the campaign with the new mapIds array
		const updated = await UpdateCampaign(session, params.id, { mapIds: updatedMapIds });
		if (!updated) {
			return fail(500, { error: 'Failed to add map.' });
		}

		try {
			const database = client.db('campaign');
			const mapsCollection = database.collection('maps');
	
			const mapDocument = {
				_id: mapId, // Use the same ID as the map
				name: mapName,
				characters: [], // Initialize as an empty array
				monsters: [], // Initialize as an empty array
				objects: [], // Initialize as an empty array
				shapes: [] // Initialize as an empty array
			};
	
			await mapsCollection.insertOne(mapDocument);
		} catch (dbError) {
			console.error('Failed to create map document in database:', dbError);
			return fail(500, { error: 'Failed to create map document in database.' });
		}

		return { success: true, map: newMap };
	},
	removeMap: async ({ request, params, locals: { safeGetSession, supabase } }) => {
		const session = (await safeGetSession()).session;
		const formData = await request.formData();
		const mapId = formData.get('mapId');

		if (!mapId) {
			return fail(400, { error: 'Map ID is required.' });
		}

		const campaign = await GetCampaignByIdAdmin(session, params.id);
		if (!campaign) {
			throw error(404, 'Campaign not found.');
		}

        const mapToRemove = campaign.mapIds.find((map) => map.id === mapId);
        if (!mapToRemove) {
            return fail(404, { error: 'Map not found.' });
        }
    
        // Remove the corresponding image from Supabase storage
        try {
            const { error: deleteError } = await supabase.storage
                .from('character-avatars')
                .remove([mapToRemove.id]);
            
        } catch {
                console.error('Error deleting map from storage:');
                return fail(500, { error: 'Failed to delete map from storage.' });
        }

		try {
			const database = client.db('campaign');
			const mapsCollection = database.collection('maps');
	
			const deleteResult = await mapsCollection.deleteOne({ _id: mapId });
			if (deleteResult.deletedCount === 0) {
				console.error('Failed to delete map document from database.');
				return fail(500, { error: 'Failed to delete map document from database.' });
			}
		} catch (dbError) {
			console.error('Error deleting map document from database:', dbError);
			return fail(500, { error: 'Failed to delete map document from database.' });
		}
    

		// Filter out the map with the given ID
		const updatedMapIds = campaign.mapIds.filter((map) => map.id !== mapId);

		// Update the campaign with the new mapIds array
		const updated = await UpdateCampaign(session, params.id, { mapIds: updatedMapIds });
		if (!updated) {
			return fail(500, { error: 'Failed to remove map.' });
		}

		return { success: true };
	}
};
