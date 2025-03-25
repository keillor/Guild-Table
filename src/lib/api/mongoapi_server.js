import { ObjectId} from 'mongodb';
import { client } from './db';



const serializeNonPOJOs = (value) => {
    return structuredClone(value)
};


//GET
/**
 * 
 * @param {string} slugObjectID 
 * @returns The quiered character if exists.
 *          `result` can be null.
 */
export async function getSingleCharacter(slugObjectID) {
    //WARNING:  must use this if returning to client.
    //          sveltekit does not like ObjectId instance. Runtime will complain that you may
    //          only return plain-old-json from server to client.
    try {
        const database = client.db('character');
        const stdCharacters = database.collection('standard_characters');
        const result = await stdCharacters.findOne(
            {_id: new ObjectId(slugObjectID)},
            { projection: {_id: 0}}
        );
        return result;
    } catch (e) {
        console.log("getSingleCharacter ERROR!")
        return null;
    }
}

/**
 * 
 * @param {import('@supabase/supabase-js').Session} session 
 * @param {string} slugObjectID 
 */
export async function getSingleCharacterVerified(session, slugObjectID) {
    console.log("PROVIDED", session.user.id, slugObjectID);
    const character = await serverGetSingleCharacter(slugObjectID);
    console.log("FETCHED", character.user)
    if(session.user.id == character.user) {
        character._id = character._id.toString();
        return character;
    } else {
        return false;
    }
}



/**
 * 
 * @param {string} slugObjectID 
 * @returns The result of querying the character collection. 
 *          `result` can be null.
 */
export async function serverGetSingleCharacter(slugObjectID) {
    try {
        const database = client.db('character');
        const stdCharacters = database.collection('standard_characters');
        const result = await stdCharacters.findOne(
            {_id: new ObjectId(slugObjectID)},
        );
        return result;
    } catch (e) {
        console.log("getSingleCharacter ERROR!")
        return false;
    }
}

/**
 * 
 * @param {string} userID 
 * @returns The array of characters. Array can be empty or null.
 */
export async function getAllUserCharacters(userID) {
    try {
        const database = client.db('character');
        const stdCharacters  = database.collection('standard_characters');
        const query = { user: userID };
        const cursor = await stdCharacters.find(query);
        const results = await cursor.toArray();
        const serializedCharacters = results.map(c => ({
            ...c,
            _id: c._id.toString(),
        }));
        return serializedCharacters;
    } catch (e) {
        console.log("getAllUserCharacters ERROR!", e);
        return null;
    }
}

//POST

/**
 * 
 * @param {import('$lib/models/character').CharacterTypeTS} newCharacter 
 * @returns 
 */
export async function postCharacter(newCharacter) {
    try {
        const database = client.db('character');
        const stdCharacters = database.collection('standard_characters');
        const result = await stdCharacters.insertOne(newCharacter);
        const ObjectidString = result.insertedId.toString();
        return ObjectidString;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}

export async function postCharacterVerify(session, newCharacter) {
    if(session) {
        console.log(session.user.id);
        newCharacter.user = session.user.id;
        console.log(newCharacter.user);
        const result = await postCharacter(newCharacter);
        if(result) {
            return result;
        } else {
            return false;
        }
    }
}

//PATCH
/**
 * 
 * @param {ObjectId} characterID 
 * @param {import('$lib/models/character').CharacterTypeTS} characterReplacement 
 * @returns The number of docs updated.
 */
export async function patchCharacter(characterID, characterReplacement) {
    try {
        const database = client.db('character');
        const stdCharacters = database.collection('standard_characters');

        const filter = { _id: new ObjectId(characterID)};
        const results = await stdCharacters.replaceOne(filter, characterReplacement);
        console.log("REPLACEMENT RESULT:", results);
        return results.modifiedCount;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}

/**
 * 
 * @param {import('@supabase/supabase-js').Session} session 
 * @param {string} characterID 
 * @param {import('$lib/models/character').CharacterTypeTS} characterReplacement 
 */
export async function patchCharacterVerify(session, characterID, characterReplacement) {
    const serverCharacter = await serverGetSingleCharacter(characterID)
    if(serverCharacter && session.user.id == serverCharacter.user) {
        return await patchCharacter(characterID, characterReplacement);
    } else {
        return false;
    }
}

//DELETE

/**
 * 
 * @param {ObjectId} characterID 
 * @returns the number of documents deleted.
 */
export async function deleteCharacter(characterID) {
    try {
        const database = client.db('character');
        const stdCharacters = database.collection('standard_characters');
        
        const filter = { _id: new ObjectId(characterID)};
        const results = await stdCharacters.deleteOne(filter);
        return results.deletedCount;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}

/**
 * 
 * @param {import('@supabase/supabase-js').Session} session 
 * @param {string} characterID 
 */
export async function deleteCharacterVerify(session, characterID) {
    const serverCharacter = await serverGetSingleCharacter(characterID);
    if(serverCharacter && session.user.id == serverCharacter.user) {
        const result = await deleteCharacter(characterID);
        return result;
    } else {
        return false;
    }
}