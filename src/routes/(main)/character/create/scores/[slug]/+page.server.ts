import { getSingleCharacter, patchCharacter, patchCharacterVerify, serverGetSingleCharacter } from '$lib/api/mongoapi_server.js';
import { error, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { type CharacterTypeTS } from '$lib/models/character.js';
export async function load({ params, locals: { supabase, session } }) {
    const singleCharacter = await getSingleCharacter(params.slug);
    if(singleCharacter) {
        if (session?.user.id == singleCharacter.user) {
            return {singleCharacter}
        }
    }
    error(404, "Character not found.");
}
const newAbilityScores = z.object({
    cha: z.number().min(-100).max(500),
    con: z.number().min(-100).max(500),
    dex: z.number().min(-100).max(500),
    int: z.number().min(-100).max(500),
    str: z.number().min(-100).max(500),
    wis: z.number().min(-100).max(500)
});

export const actions = {
    default: async ({request, locals: {session}, route, params}) => {
        const formData = await request.formData();
        const formResults = await superValidate(formData, zod(newAbilityScores));
        const characterID = params.slug;
        if(!formResults.valid) {
            console.log(formResults.errors);
            return {message: formResults.errors};
        }
        const oldCharacter : CharacterTypeTS = await serverGetSingleCharacter(characterID);
        oldCharacter.ability_scores = formResults.data;
        const results = await patchCharacterVerify(session, characterID, oldCharacter);
        if(!results) {
            error(500, "Error updating character");
        }
        //redirect user to new character page.
        redirect(303, '/character');
    }
};