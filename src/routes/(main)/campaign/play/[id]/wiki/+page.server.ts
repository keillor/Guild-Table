import { GetWikisByCampaign } from '$lib/api/wiki_server.js'

export const load = async ({params, locals: {session}}) => {
    const wikis = GetWikisByCampaign(session, params.id);
    return { wikis };
}