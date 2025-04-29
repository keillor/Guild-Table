<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Campaign } from '$lib/models/Campaign.js';
	import { Link, UserSearch } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { getAvatar } from '$lib/utilities/character/character.js';
	import { characterSchema } from '../../../character/[id]/schema';

	const { data } = $props();
	const campaignInstance: Campaign = $state(data.campaign);
	let linkedCharacter = $state({});
	let requestInitiated = false;
	let fetchedCharacters = $state(false);
	let fetchCharacterForm = $state<HTMLFormElement>(null!);

	function handleCharacterFetch({ formData }) {
		return async ({ result }) => {
			const response = await result;
			if (response.type == 'success') {
				fetchedCharacters = response.data.characters; // Save the result into fetchedCharacters
				console.log(response);
			} else {
				console.error('Failed to fetch characters.');
				console.log(response);
			}
		};
	}

	function handleCharacterLink({ formData }) {
		return async ({ result }) => {
			const response = await result;
			if (response.type == 'success') {
				console.log(response);
				toast.success('Character linked!')
			} else {
				toast.error('Failed to link character.')
				console.log(response);
			}
		};
	}
</script>

{#if campaignInstance != null && campaignInstance}
	<h1 class="mb-3 text-3xl font-bold underline-offset-2">Campaign: {campaignInstance.name}</h1>
	<p>Description: {campaignInstance.description}</p>
	{#if campaignInstance.characterIds.filter((c) => c.user == data.session.user.id).length < 1}
		<Alert.Root variant="destructive">
			<UserSearch class="size-4" />
			<Alert.Title>No character linked to campaign.</Alert.Title>
			<Alert.Description>
				<Dialog.Root
					onOpenChange={() => {
						if (!requestInitiated) {
							fetchCharacterForm.requestSubmit();
							requestInitiated = true;
						}
					}}
				>
					<Dialog.Trigger>
						<span
							class="flex w-min flex-row items-center gap-1 text-nowrap rounded-lg p-2 outline outline-1"
						>
							<Link class="size-4" />
							Link Character
						</span>
					</Dialog.Trigger>
					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title>Link Character</Dialog.Title>
							<Dialog.Description>
								Link your character here. Click save when you are finished.
							</Dialog.Description>
						</Dialog.Header>
						<form action='?/linkCharacter' method='POST' id='linkCharacter' use:enhance={handleCharacterLink}>
							<div class="grid gap-4 py-4">
								<div class="grid grid-cols-4 items-center gap-4">
									<Label for="character" class="text-right">Character</Label>
									<Select.Root
										id="character"
										type="single"
										disabled={!fetchedCharacters}
										bind:value={linkedCharacter}
									>
										<Select.Trigger class="col-span-3">
											{linkedCharacter.name || 'Select a Character'}
										</Select.Trigger>
										<Select.Content>
											{#each fetchedCharacters as character}
												<Select.Item value={character}>
													<span class="grid grid-cols-4 gap-4">
														<Avatar.Root>
															<Avatar.Image
																src={getAvatar(character._id)}
																alt="character avatar"
															></Avatar.Image>
															<Avatar.Fallback>{character.name[0]}</Avatar.Fallback>
														</Avatar.Root>
														<span class="col-span-3">
															<b>{character.name}</b>
															<p>{character.class} / {character.race}</p>
														</span>
													</span>
												</Select.Item>
												{/each}
											</Select.Content>
										</Select.Root>
									</div>
								</div>
								<input hidden name='characterId' bind:value={linkedCharacter._id}/>
						</form>
						<Dialog.Footer>
							<Dialog.Close type='submit' form='linkCharacter' class={buttonVariants({variant: 'default'})}>Link</Dialog.Close>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</Alert.Description>
		</Alert.Root>
		<form
			method="POST"
			action="?/fetchCharacters"
			bind:this={fetchCharacterForm}
			use:enhance={handleCharacterFetch}
		></form>
	{/if}
{/if}

{#await data.characters}
	loading characters...
{:then characters} 
	{#each characters as character}
		{character.name}
	{/each}
{/await}
