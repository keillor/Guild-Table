<script>
// @ts-nocheck

	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index';
	import { Users } from 'lucide-svelte';
	import * as Card from "$lib/components/ui/card/index.js";
	import { Description } from 'formsnap';
	import { onMount, afterUpdate } from 'svelte';

	export let data;
	let { session, supabase } = data;
	let fetchedUser;


	async function renderUser() {
		const { data: { user } } = await supabase.auth.getUser();
		if (user) {
			fetchedUser = user;
		} else {
			fetchedUser = null;
		}
	}

	onMount (() => {
		renderUser()
	})

	afterUpdate (() => {
		renderUser()
	})
	
	const backgroundImage = 'https://th.bing.com/th/id/R.659c35d34d7428699f4c64615e19ee10?rik=RBT0EggNnx4rQA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f2%2f1%2ff%2f884800-vertical-dungeons-and-dragons-wallpapers-2560x1600-samsung.jpg&ehk=gxnocWgr1iMEASl%2b15MjeSmpmOPDDPrsRA7ckWHuoEM%3d&risl=&pid=ImgRaw&r=0';

	async function logout() {
		await supabase.auth.signOut();
		goto("/", { invalidateAll: true });
	}

	async function redirectToHomepage() {
		window.location.href = "/homepage";
	}
</script>

{#if fetchedUser}
	<div class="flex justify-center items-center h-screen bg-cover bg-center" style="background-image: url({backgroundImage});">
		<div class="bg-white bg-opacity-80 p-5 rounded-lg shadow-lg">
			<Card.Root>
				<Card.Header>
					<Card.Title>Welcome Back {fetchedUser.email}!</Card.Title>
					<Card.Description>An Online Dungeons & Dragons Tabletop</Card.Description>
				</Card.Header>
				<Card.Content>
					<Card.Description>
						<div class="flex flex-col items-center">
							<Button onclick={redirectToHomepage} class="block">Continue to Homepage</Button>
							<p class="items-center">or</p>
							<Button onclick={logout} class="block">Logout</Button>
						</div>
					</Card.Description>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
{:else}
<div class="flex justify-center items-center h-screen bg-cover bg-center" style="background-image: url({backgroundImage});">
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