import { getSingleCharacter } from '$lib/api/mongoapi_server.js';
import { error } from '@sveltejs/kit';
export async function load({ params }) {
    const singleCharacter = await getSingleCharacter(params.slug);
    if(singleCharacter) {
        return {singleCharacter}
    }
    error(404, "Character not found.");
}