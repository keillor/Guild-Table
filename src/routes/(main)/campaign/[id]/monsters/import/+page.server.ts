import { GetCampaignByIdAdmin } from '$lib/api/campaign_manage';
import { client } from '$lib/api/db.js';
import { dnd5ApiAllMonster, dnd5ApiMonsterByIndex } from '$lib/api/dnd5api_client.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb'; // Assuming you're using MongoDB

export const load = async ({}) => {
    const monsterPromise = dnd5ApiAllMonster();
    return { monsterPromise };
};

export const actions = {
    importMonster: async ({ request, params, locals: { session } }) => {
        const formData = await request.formData();
        const monsterIndex = formData.get('monsterIndex');

        // Validate monsterIndex with regex (alphanumeric and dashes only)
        const isValidIndex = /^[a-zA-Z0-9-]+$/.test(monsterIndex);
        if (!monsterIndex || !isValidIndex) {
            throw error(400, 'Invalid monster index.');
        }

        // Ensure the user is authorized
        if (!session || !session.user) {
            throw error(401, 'Unauthorized.');
        }

        // Check if the user is an admin of the campaign
        const campaignId = params.id;
        const campaign = await GetCampaignByIdAdmin(session, campaignId);
        if (!campaign) {
            throw error(401, 'Not authorized');
        }

        try {
            // Fetch the monster data by index
            const monsterData = await dnd5ApiMonsterByIndex(monsterIndex);
            if (!monsterData) {
                throw error(404, 'Monster not found.');
            }

            // Add campaign ID and generate a unique _id for the monster
            const monsterDocument = {
                ...monsterData,
                _id: new ObjectId(), // Generate a unique ObjectId
                campaign: campaignId // Add the campaign ID
            };

            // Upload the monster to the "monsters" collection
            const database = client.db('campaign');
            const monstersCollection = database.collection('monsters');

            // Insert the monster document into the collection
            const result = await monstersCollection.insertOne(monsterDocument);

            if (!result.acknowledged) {
                throw error(500, 'Failed to save the monster to the database.');
            }

            return { success: true};
        } catch (err) {
            console.error('Error importing monster:', err);
            throw error(500, 'Failed to import monster.');
        }
    }
};