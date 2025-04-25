import { redirect } from '@sveltejs/kit';

export const load = async ({locals: {supabase}}) => {
    const { error } = await supabase.auth.signOut();
    redirect(302, '/');
};