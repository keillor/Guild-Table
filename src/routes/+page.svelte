<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index';
	import { Users } from 'lucide-svelte';

	export let data;
	$: ({ supabase, user } = data);

	async function logout() {
		await supabase.auth.signOut();
		goto("/", { invalidateAll: true});
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Button href="/character">Character Manage</Button>
<Button href="/login">Login Screen</Button>

<h1>Users</h1>
{#if user}
	<p>Current user email: {user.email}</p>
	<Button on:click={logout}>Logout</Button>
{:else}
	<p>No user is currently signed in</p>
{/if}