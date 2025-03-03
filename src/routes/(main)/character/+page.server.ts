import { deleteCharacter, getAllUserCharacters, serverGetSingleCharacter} from '$lib/api/mongoapi_server.js';
import { json, redirect } from '@sveltejs/kit';
import { User } from 'lucide-svelte';

const validateWithRegex = (value) => {
    const regex = new RegExp(/^[a-fA-F0-9]{24}$/);
  
    if (value !== "" && typeof value === "string") {
      const result = value.match(regex);
      return result?.length > 0;
    }
    return false;
  };

export const load = async ({locals: {session}}) => {
    const userId = session!?.user.id;
    const result = await getAllUserCharacters(userId);
    return {characters: result};
};

export const actions = {
    delete: async ({request, locals: {session}}) => {
        const formData = await request.formData();
        const characterId = formData.get('id');
        const characterData = await serverGetSingleCharacter(characterId);
        if(characterData && characterData.user == session?.user.id) {
            console.log(characterData, session);
            const result = await deleteCharacter(characterId);
            if(result) {
                console.log("deleted", characterId)
            } else {
                console.log('delete failed', characterId);
                console.log(characterData, session?.user.id)
            }
        }
        redirect(303, '/character');
    }
};