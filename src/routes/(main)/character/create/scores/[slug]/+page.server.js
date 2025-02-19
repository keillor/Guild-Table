import { error } from '@sveltejs/kit';
export async function load({ params }) {
    //params.slug
    //GET single character
    
    error(404, "Character not found.");
}