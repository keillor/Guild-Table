import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { campaignSchema } from './schema'; // Import your Zod schema
import type { Campaign } from '$lib/models/Campaign.js';
import { CreateNewCampaign, DeleteCampaign, GetCampaignsByUser } from '$lib/api/campaign_manage.js';


export const load = async ({locals: {session}}) => {
    const result = await GetCampaignsByUser(session);
    if(result) {
        return {result};
    }
}

export const actions = {
    new: async (event) => {
        const form = await superValidate(event, zod(campaignSchema));
        if (!form.valid) {
            return fail(400, { form });
        }
        const campaignInstance : Campaign = {
            name: form.data.name,
            description: form.data.description || '',
            owner: event.locals.session?.user.id,
            characterIds: [],
            invites: [],
            mapIds: [],
            users: []
        }
        console.log(campaignInstance);
        const result = await CreateNewCampaign(event.locals.session, campaignInstance);
        if(result) {
            return {
                form,
                campaignId: result
            };
        } else {
            return fail(500, {
                form,
                error: 'Failed to create new campaign.'
            })
        }
    },
    delete: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get('id');
        if(id) {
            const result = await DeleteCampaign(event.locals.session, id);
            if(result) {
                return result;
            }
        }
        return error(500, 'Whoops! Please try again later.');
    }
};