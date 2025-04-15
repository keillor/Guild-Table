import { error } from '@sveltejs/kit';
import { client } from './db';
import { ObjectId } from 'mongodb';
import { Body } from '$lib/components/ui/table';

/**
 * Creates a new campaign in the database.
 * @param {import('@supabase/supabase-js').Session} session - The user's session object.
 */
export async function CreateNewCampaign(session, campaignData) {
    try {
        if (!session || !session.user || !session.user.id) {
            throw new Error('Invalid session object.');
        }

        const database = client.db('campaign');
        const campaigns = database.collection('campaign_data');

        // Attach the user ID as the owner of the campaign
        campaignData.owner = session.user.id;

        const result = await campaigns.insertOne(campaignData);
        return result.insertedId.toString();
    } catch (e) {
        console.error('Error creating campaign:', e);
        return false;
    }
}

/**
 * Updates an existing campaign in the database.
 * @param {import('@supabase/supabase-js').Session} session - The user's session object.
 * @param {string} campaignId - The ObjectId of the campaign to update.
 * @returns {Promise<number | false>} The number of documents updated if successful, otherwise `false`.
 */
export async function UpdateCampaign(session, campaignId, campaignData) {
    try {
        if (!session || !session.user || !session.user.id) {
            throw new Error('Invalid session object.');
        }

        const database = client.db('campaign');
        const campaigns = database.collection('campaign_data');

        // Fetch the campaign to verify ownership
        const campaign = await campaigns.findOne({ _id: new ObjectId(campaignId) });
        if (!campaign || campaign.owner !== session.user.id) {
            console.error('Unauthorized or campaign not found.');
            return false;
        }
        const result = await campaigns.updateOne(
            { _id: new ObjectId(campaignId) },
            { $set: campaignData }
        );

        return result.modifiedCount;
    } catch (e) {
        console.error('Error updating campaign:', e);
        return false;
    }
}

/**
 * Deletes a campaign from the database.
 * @param {import('@supabase/supabase-js').Session} session - The user's session object.
 * @param {string} campaignId - The ObjectId of the campaign to delete.
 * @returns {Promise<number | false>} The number of documents deleted if successful, otherwise `false`.
 */
export async function DeleteCampaign(session, campaignId) {
    try {
        if (!session || !session.user || !session.user.id) {
            throw new Error('Invalid session object.');
        }

        const database = client.db('campaign');
        const campaigns = database.collection('campaign_data');

        // Fetch the campaign to verify ownership
        const campaign = await campaigns.findOne({ _id: new ObjectId(campaignId) });
        if (!campaign || campaign.owner !== session.user.id) {
            console.error('Unauthorized or campaign not found.');
            return false;
        }

        // Delete the campaign
        const result = await campaigns.deleteOne({ _id: new ObjectId(campaignId) });
        return result.deletedCount;
    } catch (e) {
        console.error('Error deleting campaign:', e);
        return false;
    }
}

/**
 * Retrieves all campaigns owned by the user.
 * @param {import('@supabase/supabase-js').Session} session - The user's session object.
 * @returns {Promise<Array<{ _id: string, name: string }>>} An array of campaigns with their IDs and names.
 */
export async function GetCampaignsByUser(session) {
    try {
        if (!session || !session.user || !session.user.id) {
            throw new Error('Invalid session object.');
        }

        const database = client.db('campaign');
        const campaigns = database.collection('campaign_data');

        // Query the database for all campaigns owned by the user
        const results = await campaigns
            .find({ owner: session.user.id }, { projection: { name: 1, description: 1} })
            .toArray();

        // Convert ObjectId to string for client compatibility
        return results.map((campaign) => ({
            _id: campaign._id.toString(),
            name: campaign.name,
            description: campaign.description,
        }));
    } catch (e) {
        console.error('Error retrieving campaigns:', e);
        return [];
    }
}

/**
 * Retrieves a campaign by its ObjectId.
 * @param {import('@supabase/supabase-js').Session} session - The user's session object.
 * @param {string} campaignId - The ObjectId of the campaign to retrieve.
 * @returns {Promise<{ _id: string, name: string, description: string } | null>} The campaign object if found and authorized, otherwise `null`.
 */
export async function GetCampaignByIdAdmin(session, campaignId) {
    try {
        if (!session || !session.user || !session.user.id) {
            throw new Error('Invalid session object.');
        }

        const database = client.db('campaign');
        const campaigns = database.collection('campaign_data');

        // Fetch the campaign by its ObjectId
        const campaign = await campaigns.findOne({ _id: new ObjectId(campaignId) });

        // Check if the campaign exists and the user is authorized to access it
        if (!campaign || campaign.owner !== session.user.id) {
            console.error('Unauthorized or campaign not found.');
            throw error(404, 'Campaign not found.');
        }

        // Convert ObjectId to string for client compatibility
        return {...campaign,
            _id: campaign._id.toString()
        };
    } catch (e) {
        console.log(e);
        throw error(e.status, e.body.message);
    }
}


/**
 * Retrieves the name and description of campaigns by their ObjectIds.
 * @param {string[]} campaignIds - An array of campaign ObjectIds as strings.
 * @returns {Promise<Array<{ _id: string, name: string, description: string }>>} An array of campaigns with their IDs, names, and descriptions.
 */
export async function GetCampaignsByIds(campaignIds) {
    try {
        if (!Array.isArray(campaignIds) || campaignIds.length === 0) {
            throw new Error('Invalid campaignIds array.');
        }

        const database = client.db('campaign');
        const campaigns = database.collection('campaign_data');

        // Convert string IDs to ObjectId
        const objectIds = campaignIds.map((id) => new ObjectId(id));

        // Query the database for campaigns with the given IDs
        const results = await campaigns
            .find(
                { _id: { $in: objectIds } }, // Match campaigns with the given ObjectIds
                { projection: { name: 1, description: 1 } } // Only return name and description
            )
            .toArray();

        // Convert ObjectId to string for client compatibility
        return results.map((campaign) => ({
            _id: campaign._id.toString(),
            name: campaign.name,
            description: campaign.description || 'No description provided',
        }));
    } catch (e) {
        console.error('Error retrieving campaigns by IDs:', e);
        return [];
    }
}

/**
 * Retrieves a campaign by its ObjectId for a user.
 * Ensures the user is authorized to view the campaign by checking the `users` array.
 * @param {import('@supabase/supabase-js').Session} session - The user's session object.
 * @param {string} campaignId - The ObjectId of the campaign to retrieve.
 * @returns {Promise<{ _id: string, name: string, description: string } | null>} The campaign object if found and authorized, otherwise throws an error.
 */
export async function GetCampaignByIdUser(session, campaignId) {
    try {
        if (!session || !session.user || !session.user.id) {
            throw new Error('Invalid session object.');
        }

        const database = client.db('campaign');
        const campaigns = database.collection('campaign_data');

        // Fetch the campaign by its ObjectId
        const campaign = await campaigns.findOne({ _id: new ObjectId(campaignId) });

        // Check if the campaign exists and the user is authorized to access it
        if (!campaign || !campaign.users.includes(session.user.id)) {
            console.error('Unauthorized or campaign not found.');
            throw error(404, 'Campaign not found.');
        }

        // Convert ObjectId to string for client compatibility
        return {
            ...campaign,
            _id: campaign._id.toString(),
        };
    } catch (e) {
        console.error('Error retrieving campaign by ID for user:', e);
        throw error(e.status || 500, e.message || 'Failed to retrieve campaign.');
    }
}