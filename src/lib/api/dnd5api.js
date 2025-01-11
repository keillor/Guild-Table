//import { DND5APIURL } from "$env/static/private";

export async function dnd5ApiRequest(uri) {
    const fetchResult = await fetch(`https://www.dnd5eapi.co/api/${uri}`);
    const results = await fetchResult.json();
    return results;
}