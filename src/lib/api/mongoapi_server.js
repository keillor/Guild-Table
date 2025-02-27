import { MONGO_URL } from '$env/static/private';
import { MongoClient, ObjectId} from 'mongodb';

const client = new MongoClient(MONGO_URL);

const serializeNonPOJOs = (value) => {
    return structuredClone(value)
};


//GET
/**
 * 
 * @param {ObjectId} slugObjectID 
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
 * @param {ObjectId} slugObjectID 
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
        return null;
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
        console.log(query);
        const cursor = await stdCharacters.find(query);
        const results = await cursor.toArray();
        return serializeNonPOJOs(results);
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

        const filter = { _id: characterID};
        const results = await stdCharacters.replaceOne(filter, characterReplacement);
        console.log("REPLACEMENT RESULT:", results);
        return results.upsertedCount;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
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
        
        const filter = { _id: characterID};
        const results = await stdCharacters.deleteOne(filter);
        return results.deletedCount;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}

