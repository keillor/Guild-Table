import { client } from "./db";
import { ObjectId } from "mongodb";


/**
 * 
 * @param {import("$lib/models/wikipage").Wiki} wikiInstance 
 */
export async function CreateNewWiki(wikiInstance) {
    try {
        const database = client.db('wiki');
        const pages = database.collection('pages');
        const result = await pages.insertOne(wikiInstance);
        const ObjectIdString = result.insertedId.toString();
        return ObjectIdString;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}

export async function UpdateWiki(wikiInstance, objectId) {
    try {
        const database = client.db('wiki');
        const pages = database.collection('pages');
        const filter = {_id: new ObjectId(objectId)}
        const results = await pages.replaceOne(filter, wikiInstance);
        return results.modifiedCount;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }

}

export async function DeleteWiki(objectId) {
    try {
        const database = client.db('wiki');
        const pages = database.collection('pages');
        const filter = {_id: new ObjectId(objectId)}
        const results = await pages.deleteOne(filter);
        return results.deletedCount;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}