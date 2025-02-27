import { getAllUserCharacters } from '$lib/api/mongoapi_server.js';

export const load = async ({locals: {session}}) => {
    const userId = session!?.user.id;
    const result = await getAllUserCharacters(userId);
    return {characters: result};
};