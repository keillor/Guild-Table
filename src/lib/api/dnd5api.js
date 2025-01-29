//import { DND5APIURL } from "$env/static/private";

const APIURL = 'https://www.dnd5eapi.co';

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

export async function dnd5ApiEquipmentCategory(equipmentCategory) {
	const regex = /^[a-zA-Z0-9-]+$/;
	const isValid = regex.test(equipmentCategory);
	if (isValid) {
		const fetchResults = await fetch(`${APIURL}/api/equipment-categories/${equipmentCategory}`);
		const results = await fetchResults.json();
		return results;
	}
}
