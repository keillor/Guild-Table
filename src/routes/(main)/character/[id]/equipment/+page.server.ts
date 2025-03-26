import { dnd5ApiEquipmentQuery } from '$lib/api/dnd5api_client.js';
import { getSingleCharacterVerified, patchCharacterVerify } from '$lib/api/mongoapi_server.js';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { equipmentSchema } from './schema.js';
import { fail } from '@sveltejs/kit';
import { dnd5ApiRequest } from '$lib/api/dnd5api.js';

export const load = async ({ locals: { session }, params }) => {
	const allEquipment = dnd5ApiRequest('equipment');
	const formValidate = superValidate(zod(equipmentSchema));
	const character = getSingleCharacterVerified(session, params.id);
	if (character) {
		return {
			character: await character,
			formValidate: await formValidate,
			allEquipment: await allEquipment
		};
	}
	throw redirect(303, '/character');
};

export const actions = {
	default: async (event) => {
		const session = event.locals.session;
		console.log('form submitted');
		const form = await superValidate(event, zod(equipmentSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		} else {
			//insert userID back into Character object
            const oldCharacter = await getSingleCharacterVerified(event.locals.session, event.params.id);
            oldCharacter.equipment = form.data.equipment;
			const serverCharacter = await patchCharacterVerify(
				event.locals.session,
				event.params.id,
				oldCharacter
			);
			if (serverCharacter) {
				return message(form, 'Equipment saved!');
			} else {
				console.log('post failed.');
				return fail(400, {
					form
				});
			}
		}
	}
};
