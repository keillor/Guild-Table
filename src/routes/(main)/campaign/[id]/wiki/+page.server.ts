import { GetCampaignByIdAdmin } from '$lib/api/campaign_manage.js';
import { CreateNewWikiVerified, DeleteWikiVerified, GetWikisByCampaign, GetWikiTitlesByUser } from '$lib/api/wiki_server';
import type { Wiki } from '$lib/models/wikipage.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({locals: {session}, params}) => {
    const wikiPages = await GetWikisByCampaign(session, params.id);
    if(wikiPages) {
        return {wikiPages};
    }
    redirect(302, "/character");
}

export const actions = {
    delete: async ({request, locals: {session}}) => {
        const formData = await request.formData();
        const objectId = formData.get('objectId');
        console.log(objectId);
        if(objectId) {
            const result = await DeleteWikiVerified(session, objectId);
            console.log('result', result);
            if(result) {
                return result;
            }
        }
        return error(400, "bad request");
    },
    new: async ({request, locals: {session}}) => {
        //create a new wiki
        const formData = await request.formData();
        const wikiName = formData.get('wikiname'); 
        const campaignIdUnverified = formData.get('campaign');
        console.log(campaignIdUnverified)
        const campaignIdVerified = await GetCampaignByIdAdmin(session, campaignIdUnverified);
        if(!campaignIdVerified) {
            return error(404, "Campaign does not exist.")
        }
        if(wikiName.length == 0) {
            return error(500, "Error! Wiki name must not be empty.");
        }
        let wikiInstance : Wiki = {
            campaign: campaignIdVerified._id,
            owner: session?.user.id,
            text: '# Click here and start typing. \n Don\'t forget to click save when you are done! \n>Note: This editor supports markdown.',
            title: wikiName,
            public: false
        }
        const result = await CreateNewWikiVerified(session, wikiInstance);
        if(result) {
            return result;
        } else {
            return error(500, "Error! Wiki name must not be empty.");
        }
    }
}
