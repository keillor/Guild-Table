<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index';
	import { Users } from 'lucide-svelte';
	import * as Card from "$lib/components/ui/card/index.js";

	export let data;
	$: ({ supabase, user } = data);
	export let backgroundImage = 'https://th.bing.com/th/id/R.659c35d34d7428699f4c64615e19ee10?rik=RBT0EggNnx4rQA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f2%2f1%2ff%2f884800-vertical-dungeons-and-dragons-wallpapers-2560x1600-samsung.jpg&ehk=gxnocWgr1iMEASl%2b15MjeSmpmOPDDPrsRA7ckWHuoEM%3d&risl=&pid=ImgRaw&r=0';

	async function logout() {
		await supabase.auth.signOut();
		goto("/", { invalidateAll: true});
	}
</script>

<style>
	.centered-card {
		background-image: url({backgroundImage});
		background-size: cover;
		background-position: center;
	}
</style>

{#if user}
	<p>Current user email: {user.email}</p>
	<Button onclick={logout}>Logout</Button>
{:else}
<div class="flex justify-center items-center h-screen">
	<Card.Root>
		<Card.Header>
			<Card.Title>Welcome To Guild Table!</Card.Title>
			<Card.Description>An Online Dungeons & Dragons Tabletop</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button href="/login" class="block text-center">Login</Button>
			<br>
			<Button href="/register" class="block text-center">Register</Button>
		</Card.Content>
		<Card.Footer>
			<p>PLEASE LOG IN</p>
			<Button href="/character">Character Manage</Button>
			<Button href="/login">Login Screen</Button>
			<Button href="/homepage">Homepage Screen</Button>
		</Card.Footer>
	</Card.Root>
</div>
{/if}