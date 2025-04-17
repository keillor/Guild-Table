import { GetCampaignByIdAdmin, GetCampaignByIdUser } from '$lib/api/campaign_manage.js';
import { client } from '$lib/api/db';
import { error, json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const load = async ({ locals: { session }, params }) => {
    const campaign = await GetCampaignByIdUser(session, params.id);
    return { campaign };
};

export const actions = {
    fetchCharacters: async ({ locals: { session } }) => {
        try {
            // Validate the session
            if (!session || !session.user || !session.user.id) {
                throw error(401, 'Unauthorized: Invalid session.');
            }

            const userId = session.user.id;

            // Connect to the database
            const database = client.db('character');
            const characters = database.collection('standard_characters');

            // Fetch the user's characters
            const userCharacters = await characters
                .find({ user: userId }, { projection: { name: 1, class: 1, race: 1 } }) // Only fetch the required fields
                .toArray();

            // Map the results to include the id as a string
            const formattedCharacters = userCharacters.map((character) => ({
                _id: character._id.toString(),
                name: character.name,
                class: character.class,
                race: character.race,
                avatar: character.avatar
            }));

            return { success: true, characters: formattedCharacters };
        } catch (e) {
            console.error('Error fetching user characters:', e);
            throw error(500, 'Failed to fetch user characters.');
        }
    },

    linkCharacter: async ({ request, locals: { session }, params }) => {
        try {
            // Validate the session
            if (!session || !session.user || !session.user.id) {
                throw error(401, 'Unauthorized: Invalid session.');
            }

            const userId = session.user.id;
            const formData = await request.formData();
            const characterId = formData.get('characterId')?.toString();

            if (!characterId) {
                throw error(400, 'Character ID is required.');
            }

            // Connect to the database
            const characterDb = client.db('character');
            const characters = characterDb.collection('standard_characters');

            // Verify the user owns the character
            const character = await characters.findOne({ _id: new ObjectId(characterId), user: userId });
            if (!character) {
                throw error(403, 'You do not own this character.');
            }

            // Connect to the campaign database
            const campaignDb = client.db('campaign');
            const campaigns = campaignDb.collection('campaign_data');

            // Add the character ID to the campaign's characterIds array
            const campaignUpdateResult = await campaigns.updateOne(
                { _id: new ObjectId(params.id) },
                { $addToSet: { characterIds: {characterId, user: session.user.id} } } // Use $addToSet to avoid duplicates
            );

            if (campaignUpdateResult.modifiedCount === 0) {
                throw error(500, 'Failed to link character to campaign.');
            }

            return {...character, _id: character._id.toString() };
        } catch (e) {
            console.error('Error linking character to campaign:', e);
            throw error(500, 'An error occurred while linking the character.');
        }
    }
};