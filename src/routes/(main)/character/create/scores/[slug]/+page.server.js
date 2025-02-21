import { getSingleCharacter } from '$lib/api/mongoapi_server.js';
import { error } from '@sveltejs/kit';
export async function load({ params, locals: { supabase, session } }) {
    const singleCharacter = await getSingleCharacter(params.slug);
    if(singleCharacter) {
        if (session?.user.id == singleCharacter.user) {
            return {singleCharacter}
        }
    }
    error(404, "Character not found.");
}