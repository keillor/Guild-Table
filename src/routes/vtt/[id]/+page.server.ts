import { loadCampaignCharacters, loadCampaignInformation } from "$lib/api/mongoapi_server.js"

// Test Campaign URL:
// http://localhost:5173/vtt/6802904e5750fa22e6ac3d33

export const load = async ({params, locals: {session}}) => {
    try {
    const characters = await loadCampaignCharacters(session, params.id);
    const campaign = await loadCampaignInformation(session, params.id);

    return { campaign, characters }
    } catch {
    throw error(500, "Whoops! There was a problem!")
    return {error: "Whoops! There was a problem!"}
    }
}