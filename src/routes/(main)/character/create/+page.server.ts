import { superValidate, message, defaultValues, type Infer } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { dnd5ApiRaw, dnd5ApiRequest } from '@/api/dnd5api.js';
import {
	abilityInputNames,
	listInputNames,
	newClassRaceSchema,
	numberInputNames,
	raceDataSchema,
	stringInputNames
} from './schema';
import type { Actions } from './$types.js';
import { postCharacter, postCharacterVerify } from '$lib/api/mongoapi_server';
import { type CharacterTypeTS } from '$lib/models/character.ts';
import { dnd5ApiEquipmentQuery } from '$lib/api/dnd5api_client.js';

//steps length is used to detemine if the form has been completed.

const steps = [zod(newClassRaceSchema), zod(raceDataSchema)];
const lastStep = steps[steps.length - 1];
export const load = async ({ request }) => {
	let step = 1;
	const results : Object = {};

	//determine if we already know the step number
	try {
		step = request.locals['step'];
	} catch {
		step = 1;
	}

	//only fetch the data that we need for that new page.
	if (step == 1) {
		const [races, classes] = await Promise.all([
			dnd5ApiRequest('races'),
			dnd5ApiRequest('classes')
		]);
		results['races'] = races;
		results['classes'] = classes;
	} else if (step == 2) {
		//const levelPromise = await dnd5ApiRaw(`/api/classes/${request.locals['class']}/level/1`)
		const [
			raceData,
			languages,
			proficiencies,
			traits,
			classData,
			levelData,
			equipmentData,
			features,
			spells
		] = await Promise.all([
			dnd5ApiRaw(`/api/races/${request.locals['race']}`),
			dnd5ApiRaw(`/api/languages`),
			dnd5ApiRaw(`/api/proficiencies`),
			dnd5ApiRaw(`/api/traits`),
			dnd5ApiRaw(`/api/classes/${request.locals['class']}`),
			dnd5ApiRaw(`/api/classes/${request.locals['class']}/levels/1`),
			dnd5ApiRaw(`/api/equipment`),
			dnd5ApiRaw(`/api/features`),
			dnd5ApiRaw(`/api/classes/${request.locals['class']}/spells`)
		]);
		results['raceData'] = raceData;
		results['languages'] = languages;
		results['proficiencies'] = proficiencies;
		results['traits'] = traits;
		results['classData'] = classData;
		results['levelData'] = levelData;
		results['equipmentData'] = equipmentData;
		results['features'] = features;
		results['spells'] = spells;
	}

	//create a superForm with the final schema to init all the potential vars
	// @ts-ignore
	const form = await superValidate<Infer<typeof newClassRaceSchema>>(lastStep);
	return { form, results };
};

/**
 * Parses input form data data returned from the user. User input is verified using Regex.
 * @param formData The formData object returned from the client request.
 */
async function parseUserCharacterData(formData: any) {
	let newCharacterConstruction : CharacterTypeTS = {};
	const regexLettersDashesOnly = /^[a-zA-Z0-9.,' \-]+$/;

	//grab string only values.
	//replace invalid values (including empty) with empty string.
	for (const [key, value] of Object.entries(stringInputNames)) {
		try {
			const propertyToAdd = formData.get(value);
			if (propertyToAdd !== null && regexLettersDashesOnly.test(propertyToAdd)) {
				newCharacterConstruction[key] = propertyToAdd;
			} else {
				newCharacterConstruction[key] = '';
			}
		} catch (e) {
			console.log(e);
		}
	}

	//grab number only values.
	//empty or invalid values will be replaced with 0.
	for (const [key, value] of Object.entries(numberInputNames)) {
		try {
			const propertyToAdd = formData.get(value);
			if (!isNaN(propertyToAdd)) {
				newCharacterConstruction[key] = Number(propertyToAdd);
			} else {
				newCharacterConstruction[key] = 0;
			}
		} catch (e) {
			console.log(e);
		}
	}

	//grab ability bonus (from both race and class)
	let allAS : Object = { cha: 0, con: 0, dex: 0, int: 0, wis: 0, str: 0 };
	for (const [ability, count] of Object.entries(allAS)) {
		for (const inputName of Object.keys(abilityInputNames)) {
			const propertyToAdd = formData.get(`${inputName}_${ability}`);
			if (!isNaN(propertyToAdd)) {
				allAS[ability] += Number(propertyToAdd);
			}
		}
	}
	newCharacterConstruction.as_bonus_mod = allAS;

	newCharacterConstruction.proficiencies = listParse(
		[
			listInputNames.starting_proficiency_options,
			listInputNames.starting_proficiencies,
			listInputNames.proficiencies
		],
		formData
	);

	//newCharacterConstruction['proficiencies'] = 
	newCharacterConstruction.proficiencies = newCharacterConstruction['proficiencies'].concat(listParseTrailingNumber(listInputNames.proficiency_choices, formData));

	newCharacterConstruction.languages = listParse(
		[listInputNames.language_options, listInputNames.languages],
		formData
	);

	newCharacterConstruction.traits = listParse([listInputNames.traits], formData);

	newCharacterConstruction.features = listParse([listInputNames.features], formData);

	newCharacterConstruction.saving_throws = listParse([listInputNames.saving_throws], formData);

	newCharacterConstruction.spells = spellParseTrailingNumber('spells', formData);

	newCharacterConstruction.equipment = jsonParseTrailingNumber('equipment', formData);
	
	const init_equipment = listParse([listInputNames.starting_equipment], formData);

	for(let i = 0; i < init_equipment.length; i++) {
		newCharacterConstruction.equipment.push({
			index: init_equipment[i],
			name: init_equipment[i],
			count: 1
		})
	}

	const results = await Promise.all(
        newCharacterConstruction.equipment.map(async (item) => {
            try {
                const details = await dnd5ApiEquipmentQuery(item.index);
                return {
                    ...item,
                    name: details.name || item.name, // Use the proper name from the API
                    weight: details.weight || 0,
                    cost: details.cost || { quantity: 0, unit: 'gp' }
                };
            } catch (error) {
                console.error(`Failed to fetch details for ${item.index}:`, error);
                return {...item, weight: 0, cost: {quantity: 0, unit: 'gp'}}; // Return the original item if the API call fails
            }
        })
    );
	newCharacterConstruction.equipment = results;
	
	return newCharacterConstruction;
}

/**
 * Retrieves all form elements with provided names and parses it into an Array.
 * @param inputNames - The list of inputs you would like concatinated, in the form of strings.
 * @param formData - A formData object.
 * @returns an array of the items contacinated.
 */
function listParse(inputNames: Array<String>, formData: FormData) {
	const listRegex = /^[a-zA-Z0-9,\-]+$/;
	let itemsToConcat: Array<String> = [];
	for (let i = 0; i < inputNames.length; i++) {
		const listToAppend = String(formData.get(`${inputNames[i]}`));
		if (listRegex.test(listToAppend) && listToAppend != 'null') {
			itemsToConcat = itemsToConcat.concat(listToAppend.split(','));
		}
	}
	return itemsToConcat;
	//newCharacterConstruction['languages'] = languages;
}

function listParseTrailingNumber(inputName: string, formData: FormData) {
	let results: any = [];
	const listRegex = /^[a-zA-Z0-9,\-]+$/;
	let validInputNames = [];
	for (const key of formData.keys()) {
		if (key.startsWith(inputName)) {
			validInputNames.push(key);
		}
	}
	for (const key of validInputNames) {
		const propertyToAdd: string = formData.get(key);
		const index = key.split('_').pop();
		if (listRegex.test(propertyToAdd) && !isNaN(index)) {
			results = results.concat(propertyToAdd.split(','));
		}
	}
	return results;
}

function spellParseTrailingNumber(inputName: string, formData: FormData) {
	let results: Object = {};
	const listRegex = /^[a-zA-Z0-9,\-]+$/;
	let validInputNames = [];
	for (const key of formData.keys()) {
		if (key.startsWith(inputName)) {
			validInputNames.push(key);
		}
	}
	for (const key of validInputNames) {
		const propertyToAdd: string = formData.get(key);
		const index = key.split('_').pop();
		if (listRegex.test(propertyToAdd) && !isNaN(index)) {
			results[index] = propertyToAdd.split(',');
		}
	}
	return results;
}


function jsonParseTrailingNumber(inputName: string, formData: FormData) {
	let results: Array<object> = [];
	const listRegex = /^[a-zA-Z0-9,\-]+$/
	let validInputNames = [];
	for (const key of formData.keys()) {
		if (key.startsWith(inputName)) {
			validInputNames.push(key);
		}
	}
	for (const key of validInputNames) {
		let propertyToAdd: JSON;
		try {
			propertyToAdd = JSON.parse(formData.get(key));
		} catch {
			error(400, "Invalid Request");
		}
		const index = key.split('_').pop();
		if (!isNaN(index) && propertyToAdd != null) {
			for(const [key,value] of Object.entries(propertyToAdd)) {
				if(listRegex.test(key) && !isNaN(value)){
					results.push({
						name: key,
						index: key,
						count: value
					})		
				}
			}
		}
	}
	//parse through all possible equipment options (ex: equipment_1, equipment_2, etc...)
	return results;
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	next: async ({ request, locals: { session } }) => {
		//retrieve formData and step number
		const formData = await request.formData();
		const step = +(formData.get('step') ?? '1');

		//validate our data with the corresponding step number zod schema.
		const form = await superValidate(formData, steps[step - 1]);

		//check if form is valid
		if (!form.valid) {
			//return the form on the same step with the errors
			if (step > 1) {
				return message(form, { step: step, race: form.data['race'], class: form.data['class'] });
			}
			return message(form, { step });
		}

		if (step < steps.length) {
			request.locals = { step: step + 1, race: form.data['race'], class: form.data['class'] };
			//return next step
			return message(form, { step: step + 1 });
		}

		//form parsing
		const parsedData = await parseUserCharacterData(formData);
		console.log(parsedData);
		//Form is now complete
		//You can now save the data, return another message, or redirect to another page.
		const result = await postCharacterVerify(session, parsedData);
		if(result) {
			redirect(303, `/character/create/scores/${result}`);
		}
		error(500, "Server error!");

		//the following resets the form to the default state.
		///form.data = defaultValues(lastStep);

		//return message(form, { text: 'Form posted successfully!', step: 1 });
	}
} satisfies Actions;