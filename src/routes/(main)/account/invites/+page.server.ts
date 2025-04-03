import { GetCampaignsByIds } from '$lib/api/campaign_manage.js';
import { acceptInvite, rejectInvite, getAllInvitesByUserID } from '$lib/api/user_manage.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { session } }) => {
    const results = await getAllInvitesByUserID(session?.user.id);
    if (results.invites) {
        const campaigns = await GetCampaignsByIds(results.invites);
        return { campaigns };
    }
    return { campaigns: [] };
};

export const actions = {
    accept: async ({ request, locals: { session } }) => {
        const formData = await request.formData();
        const campaignId = formData.get('campaignId')?.toString();

        if (!campaignId) {
            return fail(400, { error: 'Campaign ID is required.' });
        }

        const success = await acceptInvite(session?.user.id, campaignId);
        if (!success) {
            return fail(500, { error: 'Failed to accept invite.' });
        }

        return { success: true, action: 'remove', id: campaignId };
    },

    reject: async ({ request, locals: { session } }) => {
        const formData = await request.formData();
        const campaignId = formData.get('campaignId')?.toString();

        if (!campaignId) {
            return fail(400, { error: 'Campaign ID is required.' });
        }

        const success = await rejectInvite(session?.user.id, campaignId);
        if (!success) {
            return fail(500, { error: 'Failed to reject invite.' });
        }

        return { success: true };
    }
};