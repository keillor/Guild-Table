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
};