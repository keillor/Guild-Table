import { getSingleCharacter, patchCharacter, postCharacter, serverGetSingleCharacter } from '$lib/api/mongoapi_server.js';
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
        const equipmentList = dnd5ApiRequest('equipment');
        const formValidate = superValidate(zod(characterSchema));
        const character = {
            ...characterData,
            _id: characterData._id.toString(),
        }
        return {character: character, form: await formValidate, languages: await languagesList, proficiencies: await proficiencyList, traits: await traitsList, features: await featuresList, spells: await spellsList, equipment: await equipmentList};
    }
    error(404, 'Character not found');
};

export const actions = {
    default: async (event) => {
      console.log(event.params.id);
        console.log('form submitted!')
      const form = await superValidate(event, zod(characterSchema));
      console.log(form.data);
      if (!form.valid) {
        return fail(400, {
          form,
        });
      } else {
        //insert userID back into Character object
        const newCharacter = form.data;
        newCharacter['user'] = event.locals.session?.user.id;
        const serverCharacter = await serverGetSingleCharacter(event.params.id);
        console.log("Getting server character.");
        console.log(serverCharacter?._id.toString(), event.params.id, event.locals.session?.user.id, serverCharacter?.user)
        if(serverCharacter != null && event.params.id === serverCharacter?._id.toString() && event.locals.session?.user.id == serverCharacter?.user) {
          const results = patchCharacter(serverCharacter._id, newCharacter);
          return message(form, "Character updated!")
        } else {
          console.log("post failed.")
          return fail(400, {
            form
          })
        }
      }
    },
  };