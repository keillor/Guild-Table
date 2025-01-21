import { superValidate, message, defaultValues, type Infer } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { dnd5ApiRaw, dnd5ApiRequest } from '@/api/dnd5api.js';
import { newClassSchema, raceDataSchema } from './schema';
import type { Actions } from './$types.js';
import { goto } from '$app/navigation';


//steps length is used to detemine if the form has been completed.
const steps = [zod(newClassSchema), zod(raceDataSchema)];
const lastStep = steps[steps.length - 1];
export const load = async ({ request }) => {
	let step = 1
	const results = {}

	//determine if we already know the step number
	try {
		step = request.locals['step'];
	} catch {
		step = 1;
	}
	
	//only fetch the data that we need for that new page.
	if (step == 1) {
		results['races'] = await dnd5ApiRequest('races');
		results['classes'] = await dnd5ApiRequest('classes');
	}
	else if (step == 2) {
		//results['raceData'] = await dnd5ApiRaw(`/api/races/${request.locals['race']}`);
		results['raceData'] = await dnd5ApiRaw(`/api/races/${request.locals['race']}`);
	}

	//create a superForm with the final schema to init all the potential vars
	// @ts-ignore
	const form = await superValidate<Infer<typeof  newClassSchema>>(lastStep);
	return { form, results };
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	next: async ({ request }) => { 

		//retrieve formData and step number
		const formData = await request.formData();
		const step = +(formData.get('step') ?? '1');

		//validate our data with the corresponding step number zod schema.
		const form = await superValidate(formData, steps[step - 1]);

		//check if form is valid
		if (!form.valid) {
			//return the form on the same step with the errors
			if (step > 1) {
				return message(form, {step: step, race: form.data['race'], class: form.data['class']})
			}
			return message(form, { step });
		}

		if (step < steps.length) {
			request.locals = {step: step + 1, race: form.data['race'], class: form.data['class']};
			//return next step
			return message(form, { step: step + 1 });
		}
		//Form is now complete
		//You can now save the data, return another message, or redirect to another page.
		console.log(form);
		redirect(303, '/character');

		//the following resets the form to the default state.
		///form.data = defaultValues(lastStep);

		return message(form, { text: 'Form posted successfully!', step: 1 });
	}
} satisfies Actions;
