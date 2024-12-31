import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { dnd5ApiRequest } from '@/api/dnd5api.js';


const newEmailSchema = z.object({
	class: z.string().min(2).max(50)
});

export const load = async (event) => {
	const form = await superValidate(zod(newEmailSchema));
	const results = await dnd5ApiRequest('races');
	return { form };
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(newEmailSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const results = await dnd5ApiRequest(`races/${form.data.class}`);
		console.log(results);
		return message(form, 'Form posted successfully!');
	}
};
