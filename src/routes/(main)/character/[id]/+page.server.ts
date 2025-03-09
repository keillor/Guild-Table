import { serverGetSingleCharacter } from '$lib/api/mongoapi_server.js';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { characterSchema } from './schema.js';
import { fail } from 'sveltekit-superforms';
import { message } from 'sveltekit-superforms';
import { dnd5ApiRequest } from '$lib/api/dnd5api.js';

export const load = async ({params, locals: {session}}) => {
    const characterId = params.id;
    const characterData = await serverGetSingleCharacter(characterId);
    if(characterData && characterData.user == session?.user.id) {
        const proficiencyList = dnd5ApiRequest('proficiencies');
        const languagesList = dnd5ApiRequest('languages');
        const traitsList = dnd5ApiRequest('traits');
        const featuresList = dnd5ApiRequest('features'); 
        const spellsList = dnd5ApiRequest('spells');
        const formValidate = superValidate(zod(characterSchema));
        const character = {
            ...characterData,
            _id: characterData._id.toString(),
        }
        return {character: character, form: await formValidate, languages: await languagesList, proficiencies: await proficiencyList, traits: await traitsList, features: await featuresList, spells: await spellsList};
    }
    error(404, 'Character not found');
};

export const actions: Actions = {
    default: async (event) => {
        console.log('form submitted!')
      const form = await superValidate(event, zod(characterSchema));
      console.log(form.data);
      if (!form.valid) {
        return fail(400, {
          form,
        });
      }
      return message(form, "Character updated!")
    },
  };