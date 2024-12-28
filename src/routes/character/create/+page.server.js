import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const newEmailSchema = z.object({
	email: z.string().email(),
	first: z.string()
});

export const load = async (event) => {
	const form = await superValidate(zod(newEmailSchema));
	return { form };
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(newEmailSchema));
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}
		return message(form, 'Form posted successfully!');
	}
};
