import { GetCampaignById } from '$lib/api/campaign_manage.js'
import { error, redirect } from '@sveltejs/kit';



export const load = async ({params, locals: {safeGetSession}}) => {
    let session = await safeGetSession()
    session = session.session
    const campaign = await GetCampaignById(session, params.id);
    if(campaign) {
        return {campaign}
    }
    error(404, 'Looks like this campaign doesn\'t exist.')
}