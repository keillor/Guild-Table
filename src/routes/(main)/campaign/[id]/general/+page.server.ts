import { PRIVATE_SUPABASE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { GetCampaignByIdAdmin, UpdateCampaign } from '$lib/api/campaign_manage.js';
import { client } from '$lib/api/db';
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
    // Action to update name and description
    changeName: async ({ request, params, locals: { safeGetSession } }) => {
        const session = (await safeGetSession()).session;
        const formData = await request.formData();
        const name = formData.get('name')?.toString();
        const description = formData.get('description')?.toString();

        if (!name || !description) {
            return fail(400, { error: 'Name and description are required.' });
        }

        const updated = await UpdateCampaign(session, params.id, { name, description });
        if (!updated) {
            return fail(500, { error: 'Failed to update campaign name and description.' });
        }

        return { success: true };
    },

    // Action to add an invite
    inviteUser: async ({ request, params, locals: { safeGetSession } }) => {
        const session = (await safeGetSession()).session;
        const formData = await request.formData();
        const invite = formData.get('invite')?.toString();

        if (!invite) {
            return fail(400, { error: 'Invite is required.' });
        }

        const campaign = await GetCampaignByIdAdmin(session, params.id);
        if (!campaign) {
            throw error(404, "Campaign not found.");
        }

        const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
        const regex = v4.test(invite)
        
        if(!regex) {
            throw error(400, 'Enter a valid user id.');
        }

        const invitation = await inviteUser(invite, params.id);

        if(!invitation) {
            throw error(500, 'Server error. User not invited.');
        }

        const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_KEY);
        const adminAuthClient = supabase.auth.admin;
        const userQuery = await adminAuthClient.getUserById(invite);
        if(!userQuery.data.user) {
            throw error(400, 'User does not exist.');
        }

        const updatedInvites = [...campaign.invites, invite];
        const updated = await UpdateCampaign(session, params.id, { invites: updatedInvites });
        if (!updated) {
            return fail(500, { error: 'Failed to add invite.' });
        }

        return { success: true };
    },

    // Action to add a map ID
    addMap: async ({ request, params, locals: { safeGetSession } }) => {
        const session = (await safeGetSession()).session;
        const formData = await request.formData();
        const mapId = formData.get('mapId')?.toString();

        if (!mapId) {
            return fail(400, { error: 'Map ID is required.' });
        }

        const campaign = await GetCampaignByIdAdmin(session, params.id);
        if (!campaign) {
            throw error(404, "Campaign not found.");
        }

        const updatedMapIds = [...campaign.mapIds, mapId];
        const updated = await UpdateCampaign(session, params.id, { mapIds: updatedMapIds });
        if (!updated) {
            return fail(500, { error: 'Failed to add map ID.' });
        }

        return { success: true };
    },
    removeUser: async ({ request }) => {
        try {
            const formData = await request.formData();
            const campaignId = formData.get('campaignId')?.toString();
            const uid = formData.get('uid')?.toString();

            if (!campaignId || !uid) {
                throw error(400, 'Campaign ID and User ID are required.');
            }

            const campaignDb = client.db('campaign');
            const campaigns = campaignDb.collection('campaign_data');

            const userDb = client.db('users');
            const users = userDb.collection('standard_users');

            // Remove the user from the campaign's `users` array
            const campaignUpdateResult = await campaigns.updateOne(
                { _id: new ObjectId(campaignId) },
                { $pull: { users: uid } } // Remove the user from the `users` array
            );

            if (campaignUpdateResult.modifiedCount === 0) {
                throw error(500, `Failed to remove user ${uid} from campaign ${campaignId}.`);
            }

            // Remove the campaign from the user's `playerCampaigns` array
            const userUpdateResult = await users.updateOne(
                { userId: uid },
                { $pull: { playerCampaigns: campaignId } } // Remove the campaign from `playerCampaigns`
            );

            if (userUpdateResult.modifiedCount === 0) {
                throw error(500, `Failed to remove campaign ${campaignId} from user ${uid}.`);
            }

            return { success: true };
        } catch (e) {
            console.error('Error removing user:', e);
            throw error(500, 'An error occurred while removing the user.');
        }
    }
};