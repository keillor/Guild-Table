import { serverGetSingleCharacter } from '$lib/api/mongoapi_server.js';
import { error } from '@sveltejs/kit';

export const load = async ({params, locals: {session}}) => {
    const characterId = params.id;
    const characterData = await serverGetSingleCharacter(characterId);
    if(characterData && characterData.user == session?.user.id) {
        const character = {
            ...characterData,
            _id: characterData._id.toString(),
        }
        return {character: character};
    }
    error(404, 'Character not found');
};