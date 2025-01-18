//import { DND5APIURL } from "$env/static/private";

const APIURL = 'https://www.dnd5eapi.co'

export async function dnd5ApiRequest(uri) {
	const fetchResult = await fetch(`${APIURL}/api/${uri}`);
	const results = await fetchResult.json();
	return results;
}

export async function dnd5ApiRaw(uri) {
	const fetchResult = await fetch(`${APIURL}${uri}`);
	const results = await fetchResult.json();
	return results;
}
