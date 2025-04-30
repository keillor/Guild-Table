import { loadCampaignCharacters, loadCampaignInformation } from "$lib/api/mongoapi_server.js"
import { GetCampaignByIdAdmin } from '$lib/api/campaign_manage';
import { client } from '$lib/api/db.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb'; // Assuming you're using MongoDB

// Test Campaign URL:
// http://localhost:5173/vtt/6802904e5750fa22e6ac3d33

export const load = async ({params, locals: {session}}) => {
    try {
    const characters = await loadCampaignCharacters(session, params.id);
    const campaign = await loadCampaignInformation(session, params.id);
    // const campaignAdmin = await GetCampaignByIdAdmin(session, params.id);

    const database = client.db('campaign');
    const monstersCollection = database.collection('monsters');

    // Retrieve all monsters for the specified campaign
    let monsters = await monstersCollection
        .find({ campaign: params.id })
        .toArray();

    monsters = monsters.map((monster) => ({
        ...monster,
        _id: monster._id.toString()
    }))

    return { campaign, characters, monsters }
    } catch {
    throw error(500, "Whoops! There was a problem!")
    return {error: "Whoops! There was a problem!"}
    }
}