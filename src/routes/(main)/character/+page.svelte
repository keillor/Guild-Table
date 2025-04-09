<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Pencil, Trash, Eye, Plus, SmilePlus, Ellipsis } from 'lucide-svelte/icons';
	import type { CharacterTypeTS } from '$lib/models/character.js';
	import as_mod_calc, { getAvatar } from '$lib/utilities/character/character.js';
	import { enhance } from '$app/forms';
	import UploadAvatar from '$lib/components/create/UploadAvatar.svelte';
	import { toast } from 'svelte-sonner';
	import { preventDefault } from 'svelte/legacy';
	const { data } = $props();
	let deleteModalOpen = $state(false);
	let characters: CharacterTypeTS[] = $state(data.characters);
	const as_names = ['cha', 'con', 'dex', 'int', 'str', 'wis'];

	function handleAvatarSubmit({ formData }) {
		return async ({ result }) => {
			const response = await result;
			console.log(response);
			if (response.type == 'success') {
				//const campaignId = formData.get('avatar');
				//campaigns = campaigns.filter((campaign) => campaign._id !== campaignId);
				toast.success('Avatar uploaded successfully.');
			} else {
				toast.error(`Failed to upload avatar. ${response.error.message}`);
			}
		};
	}
</script>

<h1 class="mb-4 text-3xl font-bold">Character Manage</h1>

<Button href="/character/create">
	<Plus class="mr-2 size-4" />
	New Character
</Button>

<h2
	class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>
	Your Characters
</h2>

{#if characters.length > 0}
	<div class="grid md:grid-cols-3 md:gap-3">
		{#each characters as character}
			<Card.Root>
				<Card.Header>
					<div class="flex flex-row justify-between">
						<div class="flex flex-row items-center gap-6">
							{#if character.hasOwnProperty('avatar')}
								<form
									id={character._id}
									name={character._id}
									method="POST"
									action="?/uploadAvatar"
									enctype="multipart/form-data"
									use:enhance={handleAvatarSubmit}
								>
									<UploadAvatar {character}>
										<Avatar.Root>
											<Avatar.Image src={getAvatar(character._id)} alt="@shadcn" />
											<Avatar.Fallback>{character.name[0]}</Avatar.Fallback>
										</Avatar.Root>
									</UploadAvatar>
								</form>
							{:else}
								<form
									id={character._id}
									name={character._id}
									method="POST"
									action="?/uploadAvatar"
									enctype="multipart/form-data"
									use:enhance={handleAvatarSubmit}
								>
									<UploadAvatar {character}>
										<SmilePlus />
									</UploadAvatar>
								</form>
							{/if}
							<h3 class="text-xl font-semibold">{character.name}</h3>
						</div>
						<div>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger class={buttonVariants({variant: 'ghost'})}>
									<Ellipsis />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Group>
										<DropdownMenu.GroupHeading>My Character</DropdownMenu.GroupHeading>
										<DropdownMenu.Separator />
										<a href='/character/{character._id}/view'>
											<DropdownMenu.Item>View</DropdownMenu.Item>
										</a>
										<a href='/character/{character._id}'>
											<DropdownMenu.Item>Edit</DropdownMenu.Item>
										</a>
										<a href='/character/{character._id}/equipment'>
											<DropdownMenu.Item>Equipment</DropdownMenu.Item>
										</a>
										<a href='/character/create/scores/{character._id}'>
											<DropdownMenu.Item>Ability Scores</DropdownMenu.Item>
										</a>
										
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
							<AlertDialog.Root>
								<AlertDialog.Trigger class={buttonVariants({variant: 'ghost'})}>
									<Trash class='text-destructive'/>
								</AlertDialog.Trigger>
								<AlertDialog.Content>
									<AlertDialog.Header>
										<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
										<AlertDialog.Description>
											This action cannot be undone. This will permanently delete your character and
											remove your them from our servers.
										</AlertDialog.Description>
									</AlertDialog.Header>
									<AlertDialog.Footer>
										<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												return async ({ result }) => {
													const results = await result;
													console.log(results);
													characters = characters.filter((c) => c._id !== character._id);
												};
											}}
										>
											<input hidden name="id" value={character._id} />
											<AlertDialog.Action class={buttonVariants({variant: 'destructive'})} type='submit'>Delete</AlertDialog.Action>
										</form>
									</AlertDialog.Footer>
								</AlertDialog.Content>
							</AlertDialog.Root>
						</div>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap justify-between">
						<div class="flex flex-col">
							<p>Race: {character.race}</p>
							<p>Class: {character.class}</p>
							<p>Level: {character.level}</p>
							<p>Age: {character.age}</p>
							<p>Hit Die: {character.hit_die}d</p>
						</div>
						<div class="grid grid-cols-3 gap-5">
							<!-- <Shield class='size-12 border-2 rounded-md'/> -->
							{#if character.ability_scores !== undefined}
								{#each as_names as strKey}
									<div
										class="flex h-24 w-24 flex-col content-center justify-between rounded-lg border-2 p-1 text-center"
									>
										<p class="underline">{strKey}</p>
										<p class="text-xl font-bold">{character.ability_scores[strKey]}</p>
										<p class="h-min rounded-full border-2 px-2">
											{as_mod_calc(character.ability_scores[strKey])}
										</p>
									</div>
								{/each}
							{:else}
								<div class="col-span-3 flex flex-col content-center justify-around">
									<p><b>Whoops!</b> Looks like this character doesn't any ability scores yet.</p>
									<Button
										href={`/character/create/scores/${character._id}`}
										class={buttonVariants({ variant: 'destructive' })}>Add Ablity Scores</Button
									>
								</div>
							{/if}
						</div>
					</div>
				</Card.Content>
			</Card.Root>
			{/each}
		</div>
		{:else}
		<p>Looks like you don't have any characters yet. Click the button above to get started!</p>
		{/if}
		