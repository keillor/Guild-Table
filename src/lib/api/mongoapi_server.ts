import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';
import { v4 as uuid4 } from 'uuid';

const client = new MongoClient(MONGO_URL);

const serializeNonPOJOs = (value: object | null) => {
    return structuredClone(value)
};


//TESTING FUNCTIONS
export async function dummyRequest() {
    try {
        const database = client.db('test');
        const movies = database.collection('movies');
        const queryResults = movies.find({});
        return serializeNonPOJOs(await queryResults.toArray());
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}

//GET
//export async function fetchSingleCharacter()

//POST
export async function postCharacter(newCharacter: object) {
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
