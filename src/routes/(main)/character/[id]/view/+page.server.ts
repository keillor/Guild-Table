import { getSingleCharacterVerified } from '$lib/api/mongoapi_server.js'

export const load = async ({locals: {session}, params}) => {
    const character = await getSingleCharacterVerified(session, params.id);
    if(character) {
        return { character };
    } 
}