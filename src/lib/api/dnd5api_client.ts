import { error } from "@sveltejs/kit";

const APIURL = 'https://www.dnd5eapi.co';

export async function dnd5ApiEquipmentCategory(equipmentCategory: string) {
    const regex = /^[a-zA-Z0-9-]+$/;
    const isValid = regex.test(equipmentCategory);
    if (isValid) {
        const fetchResults = await fetch(`${APIURL}/api/equipment-categories/${equipmentCategory}`);
        const results = await fetchResults.json();
        return results;
    } else {
        return error(400, "Invalid format.")
    }
}

export async function dnd5ApiEquipmentQuery(equipment: string) {
    const regex = /^[0-9a-zA-Z\-]+$/;
    const isValid = regex.test(equipment);
    if (isValid) {
        const fetchResults = await fetch(`${APIURL}/api/equipment/${equipment}`);
        if(!fetchResults.ok) {
            return error (400, "Dynamic information not avalible for this object.")
        }
        return fetchResults.json();
    } else {
        return error (400, "Dynamic information not avalible for this object.")
    }
}

export async function dnd5ApiSpellDetails(spell: string) {
    const regex = /^[a-zA-Z\-]+$/;
    const isValid = regex.test(spell);
    if(isValid) {
        const fetchResults = await fetch(`${APIURL}/api/spells/${spell}`);
        if(!fetchResults.ok) {
            return error (400, "Dynamic information not avalible for this object.")
        }
        return fetchResults.json();
    } else {
        return error (400, "Dynamic information not avalible for this spell.")
    }
}