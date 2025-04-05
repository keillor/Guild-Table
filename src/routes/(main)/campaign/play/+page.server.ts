import { getUserBySession } from '$lib/api/user_manage.js';
import { GetCampaignsByIds } from '$lib/api/campaign_manage.js';
import { error } from '@sveltejs/kit';
import { client } from '$lib/api/db.js';
import { ObjectId } from 'mongodb';

export const load = async ({ locals: { session } }) => {
    try {
        // Retrieve the user's standard_users object using their session
        const user = await getUserBySession(session);

        if (!user) {
            throw error(404, 'User not found.');
        }

        // Retrieve the user's campaigns
        const campaignIds = user.playerCampaigns || [];
        const campaigns = await GetCampaignsByIds(campaignIds);

        return { user, campaigns };
    } catch (e) {
        console.info('User object does not exist yet.', e);
        return {user: {}, campaings: []};

    }
};

export const actions = {
    removeUser: async ({ request, locals: { session } }) => {
        try {
            // Retrieve the user's ID from the session
            const user = await getUserBySession(session);

            if (!user) {
                throw error(404, 'User not found.');
            }

            const userId = user.userId;

            const formData = await request.formData();
            const campaignId = formData.get('campaignId')?.toString();

            if (!campaignId) {
                throw error(400, 'Campaign ID is required.');
            }

            const campaignDb = client.db('campaign');
            const campaigns = campaignDb.collection('campaign_data');

            const userDb = client.db('users');
            const users = userDb.collection('standard_users');

            // Remove the user from the campaign's `users` array
            const campaignUpdateResult = await campaigns.updateOne(
                { _id: new ObjectId(campaignId) },
                { $pull: { users: userId } } // Remove the user from the `users` array
            );

            if (campaignUpdateResult.modifiedCount === 0) {
                throw error(500, `Failed to remove user ${userId} from campaign ${campaignId}.`);
            }

            // Remove the campaign from the user's `playerCampaigns` array
            const userUpdateResult = await users.updateOne(
                { userId },
                { $pull: { playerCampaigns: campaignId } } // Remove the campaign from `playerCampaigns`
            );

            if (userUpdateResult.modifiedCount === 0) {
                throw error(500, `Failed to remove campaign ${campaignId} from user ${userId}.`);
            }

            return { success: true };
        } catch (e) {
            console.error('Error removing user:', e);
            throw error(500, 'An error occurred while removing the user.');
        }
    }
};