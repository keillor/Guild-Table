import { dnd5ApiEquipmentQuery } from '$lib/api/dnd5api_client.js';
import { getSingleCharacterVerified } from '$lib/api/mongoapi_server.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { session }, params }) => {
    const character = await getSingleCharacterVerified(session, params.id);
    if (character) {
        const results = await Promise.allSettled(
            character.equipment.map((item) => dnd5ApiEquipmentQuery(item.index))
        );

        // Extract resolved values or return the original item on error
        const resolvedResults = results.map((result, index) =>
            result.status === 'fulfilled' ? result.value : character.equipment[index]
        );

        return { character, results: resolvedResults };
    }
    throw redirect(303, '/character');
};