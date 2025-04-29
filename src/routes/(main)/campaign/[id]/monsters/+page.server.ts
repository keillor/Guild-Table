import { GetCampaignByIdAdmin } from '$lib/api/campaign_manage';
import { client } from '$lib/api/db.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb'; // Assuming you're using MongoDB

export const load = async ({ params, locals: { session } }) => {
    const campaignId = params.id;

    // Ensure the user is authorized
    if (!session || !session.user) {
        throw error(401, 'Unauthorized.');
    }

    // Check if the user is an admin of the campaign
    const campaign = await GetCampaignByIdAdmin(session, campaignId);
    if (!campaign) {
        throw error(403, 'You do not have permission to access this campaign.');
    }

    try {
        // Connect to the database
        const database = client.db('campaign');
        const monstersCollection = database.collection('monsters');

        // Retrieve all monsters for the specified campaign
        let monsters = await monstersCollection
            .find({ campaign: campaignId })
            .toArray();

        monsters = monsters.map((monster) => ({
            ...monster,
            _id: monster._id.toString()
        }))
        return { monsters };
    } catch (err) {
        console.error('Error loading monsters:', err);
        throw error(500, 'Failed to load monsters.');
    }
};

export const actions = {
    deleteMonster: async ({ request, params, locals: { session } }) => {
        const formData = await request.formData();
        const monsterId = formData.get('monsterId');
        const campaignId = params.id;

        // Validate monsterId and campaignId
        if (!monsterId || !ObjectId.isValid(monsterId)) {
            throw error(400, 'Invalid monster ID.');
        }
        if (!campaignId || !ObjectId.isValid(campaignId)) {
            throw error(400, 'Invalid campaign ID.');
        }

        // Ensure the user is authorized
        if (!session || !session.user) {
            throw error(401, 'Unauthorized.');
        }

        // Check if the user is an admin of the campaign
        const campaign = await GetCampaignByIdAdmin(session, campaignId);
        if (!campaign) {
            throw error(403, 'You do not have permission to perform this action.');
        }

        try {
            // Connect to the database
            const database = client.db('campaign');
            const monstersCollection = database.collection('monsters');

            // Delete the monster document
            const result = await monstersCollection.deleteOne({
                _id: new ObjectId(monsterId),
                campaign: campaignId // Ensure the monster belongs to the correct campaign
            });

            if (result.deletedCount === 0) {
                throw error(404, 'Monster not found or does not belong to this campaign.');
            }

            return { success: true };
        } catch (err) {
            console.error('Error deleting monster:', err);
            throw error(500, 'Failed to delete monster.');
        }
    }
};