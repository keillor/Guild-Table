import { MONGO_URL } from '$env/static/private';
import { MongoClient, ObjectId} from 'mongodb';

const client = new MongoClient(MONGO_URL);

const serializeNonPOJOs = (value) => {
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
export async function getSingleCharacter(slugObjectID) {
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

//POST
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

