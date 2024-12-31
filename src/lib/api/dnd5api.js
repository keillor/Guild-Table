import { DND5APIURL } from "$env/static/private";

export async function dnd5ApiRequest(uri) {
    const fetchResult = await fetch(`${DND5APIURL}${uri}`);
    const results = await fetchResult.json();
    return results;
}