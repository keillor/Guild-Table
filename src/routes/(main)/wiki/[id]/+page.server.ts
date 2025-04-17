import { GetWikiVerified, UpdateWikiVerified } from '$lib/api/wiki_server.js';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { wikiSchema } from './schema.js';
import { fail } from '@sveltejs/kit';
import type { Wiki } from '$lib/models/wikipage.js';

export const load = async ({ locals: { session }, params }) => {
	const formValidate = superValidate(zod(wikiSchema));
	const wikiPage = await GetWikiVerified(session, params.id);
	if (wikiPage) {
		return { wikiPage, formValidate };
	}
	redirect(302, '/character');
};

export const actions = {
	default: async (event) => {
		const session = event.locals.session;
		const form = await superValidate(event, zod(wikiSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		} else {
			const newWiki: Wiki = form.data;
			console.log(form.data);
			const updateResult = await UpdateWikiVerified(session, newWiki);

			if (updateResult) {
				console.log('Wiki updated successfully');
				return {
					form,
					success: true,
					message: 'Wiki updated successfully!'
				};
			} else {
				console.log('Failed to update wiki');
				return fail(400, {
					form,
					error: 'Failed to update wiki. Please try again.'
				});
			}
		}
	}
};
