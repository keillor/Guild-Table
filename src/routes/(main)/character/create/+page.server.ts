import { superValidate, message, defaultValues, type Infer } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { dnd5ApiRequest } from '@/api/dnd5api.js';
import { newRaceSchema, newClassSchema } from './schema';
import type { Actions } from './$types.js';
import { goto } from '$app/navigation';

const steps = [zod(newRaceSchema), zod(newClassSchema)];
const lastStep = steps[1];
export const load = async ({ request }) => {
	let step = 1
	let races = {}
	let classes = {}
	try {
		step = request.locals['step'];
		if (request.locals['step'] == 1) {
			races = await dnd5ApiRequest('races');
		}
		else if (request.locals['step'] == 2) {
			classes = await dnd5ApiRequest('classes');
		}
	} catch {
		step = 1
		races = await dnd5ApiRequest('races');
	}
	// @ts-ignore
	const form = await superValidate<Infer<typeof  newClassSchema>>(lastStep);
	return { form, races, classes };
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	next: async ({ request }) => {
		const formData = await request.formData();
		const step = +(formData.get('step') ?? '1');
		request.locals = {step: step};

		const form = await superValidate(formData, steps[step - 1]);

		console.log(form);

		if (!form.valid) {
			//return the form on the same step with the errors
			return message(form, { step });
		}

		if (step < steps.length) {
			request.locals = {step: step + 1}
			//return next step
			return message(form, { step: step + 1 });
		}
		//Form is now complete
		//You can now save the data, return another message, or redirect to another page.
		redirect(303, '/character');
		//the following resets the form to the default state.
		form.data = defaultValues(lastStep);

		
		return message(form, { text: 'Form posted successfully!', step: 1 });
	}
} satisfies Actions;
