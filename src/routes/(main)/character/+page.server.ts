import { deleteCharacter, deleteCharacterVerify, getAllUserCharacters, serverGetSingleCharacter} from '$lib/api/mongoapi_server.js';
import { error } from '@sveltejs/kit';

const validateWithRegex = (value: string) => {
    const regex = new RegExp(/^[a-fA-F0-9]{24}$/);
  
    if (value !== "" && typeof value === "string") {
      const result = value.match(regex);
      return result !== null && result !== undefined && result.length > 0;
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
        const deletedCount = await deleteCharacterVerify(session, characterId);
        if(deletedCount) {
            console.log("deleted", characterId);
            return true;
        } else {
            console.log('delete failed', characterId);
            return error(500, "Whoops! Looks like something went wrong.");
        }
    }
};