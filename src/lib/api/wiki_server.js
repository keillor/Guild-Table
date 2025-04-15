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
        delete wikiInstance._id
        const database = client.db('wiki');
        const pages = database.collection('pages');
        const filter = { _id: new ObjectId(objectId) };
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
        const filter = { _id: new ObjectId(objectId) };
        const results = await pages.deleteOne(filter);
        return results.deletedCount;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}

/**
 * 
 * @param {string} objectId 
 * @returns The queried wiki page if it exists.
 */
export async function GetWiki(objectId) {
    try {
        console.log(objectId);
        const database = client.db('wiki');
        const pages = database.collection('pages');
        const result = await pages.findOne({ _id: new ObjectId(objectId) });
        return result;
    } catch (e) {
        console.log("ERROR!", e);
        return null;
    }
}

/**
 * 
 * @param {import('@supabase/supabase-js').Session} session 
 * @param {string} objectId 
 * @returns The wiki page if the user is authorized, otherwise `false`.
 */
export async function GetWikiVerified(session, objectId) {
    const wiki = await GetWiki(objectId);
    if (wiki && session.user.id === wiki.owner) {
        wiki._id = wiki._id.toString(); // Convert ObjectId to string for client compatibility
        return wiki;
    } else {
        return false;
    }
}

/**
 * 
 * @param {import('@supabase/supabase-js').Session} session 
 * @param {import("$lib/models/wikipage").Wiki} wikiInstance 
 * @returns The ObjectId string of the created wiki page if successful.
 */
export async function CreateNewWikiVerified(session, wikiInstance) {
    if (session) {
        const result = await CreateNewWiki(wikiInstance);
        if(result) {
            return result;
        }
    }
    return false;
}

/**
 * 
 * @param {import('@supabase/supabase-js').Session} session 
 * @param {string} objectId 
 * @param {import("$lib/models/wikipage").Wiki} wikiInstance 
 * @returns The number of documents updated if successful, otherwise `false`.
 */
export async function UpdateWikiVerified(session, wikiInstance) {
    const wiki = await GetWiki(wikiInstance._id);
    console.log(session.user.id, wiki);
    if (wiki && session.user.id === wiki.owner) {
        console.log('got to update');
        return await UpdateWiki(wikiInstance, wikiInstance._id);
    } else {
        return false;
    }
}

/**
 * 
 * @param {import('@supabase/supabase-js').Session} session 
 * @param {string} objectId 
 * @returns The number of documents deleted if successful, otherwise `false`.
 */
export async function DeleteWikiVerified(session, objectId) {
    const wiki = await GetWiki(objectId);
    if (wiki && session.user.id === wiki.owner) {
        return await DeleteWiki(objectId);
    } else {
        return false;
    }
}


/**
 * 
 * @param {import('@supabase/supabase-js').Session} session 
 * @returns An array of objects containing the `title` and `_id` of each wiki owned by the user.
 *          Returns an empty array if no wikis are found.
 */
export async function GetWikiTitlesByUser(session) {
    try {
        if (!session || !session.user || !session.user.id) {
            throw new Error('Invalid session object.');
        }

        const database = client.db('wiki');
        const pages = database.collection('pages');

        // Query the database for all wikis owned by the user and project only the title and _id fields
        const results = await pages
            .find({ owner: session.user.id }, { projection: { title: 1, campaign: 1} })
            .toArray();

        // Convert ObjectId to string for client compatibility
        return results.map((wiki) => ({
            _id: wiki._id.toString(),
            title: wiki.title
        }));
    } catch (e) {
        console.log("ERROR!", e);
        return [];
    }
}