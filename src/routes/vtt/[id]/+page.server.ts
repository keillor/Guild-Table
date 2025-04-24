import { loadCampaignCharacters } from "$lib/api/mongoapi_server.js"

export const load = async ({params, locals: {session}}) => {
    try {
    const characters = await loadCampaignCharacters(session, params.id);
    return { characters }
    } catch {
    throw error(500, "Whoops! There was a problem!")
    return {error: "Whoops! There was a problem!"}
    }
}