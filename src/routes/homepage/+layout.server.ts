import type { LayoutServerLoad } from './$types';
import { getAllUserCharacters } from "$lib/api/mongoapi_server.js";
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const load: LayoutServerLoad = async ({ request, parent }) => {
	const parentData = await parent();
	const { session, cookies } = parentData;

	// Initialize Supabase client
	const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => cookies,
			setAll: (newCookies) => { /* implement setAll logic if needed */ }
		}
	});

	// Retrieve the user ID from the Supabase session
	const { data: { user } } = await supabase.auth.getUser();
	const userID = user?.id;

	// Use the user ID to fetch the user's characters
	const allCharacters = userID ? await getAllUserCharacters(userID) : [];

	return {
		session,
		user,
		cookies,
		allCharacters
	};
};