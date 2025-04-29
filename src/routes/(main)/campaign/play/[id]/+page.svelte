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
	import { page } from '$app/state';

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
				toast.success('Character linked!');
			} else {
				toast.error('Failed to link character.');
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
						<form
							action="?/linkCharacter"
							method="POST"
							id="linkCharacter"
							use:enhance={handleCharacterLink}
						>
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
															<Avatar.Image src={getAvatar(character._id)} alt="character avatar"
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
							<input hidden name="characterId" bind:value={linkedCharacter._id} />
						</form>
						<Dialog.Footer>
							<Dialog.Close
								type="submit"
								form="linkCharacter"
								class={buttonVariants({ variant: 'default' })}>Link</Dialog.Close
							>
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

<h2 class='text-2xl'>Tools:</h2>
<Button href={`/vtt/${campaignInstance._id}`}>
	Live Tabletop
</Button>
<Button href={`${page.params.id}/wiki`}>
	Campaign Wiki
</Button>

{#await data.characters}
	loading characters...
{:then characters}
	<h2 class="text-2xl">Campaign Characters:</h2>
	{#each characters as character}
		<div class="character-summary rounded-md border p-4 shadow-md">
			<Avatar.Root>
				<Avatar.Image src={getAvatar(character._id)} alt="character avatar" />
				<Avatar.Fallback>{character.name[0]}</Avatar.Fallback>
			</Avatar.Root>
			<h2 class="text-2xl font-bold">{character.name}</h2>
			<p><strong>Class:</strong> {character.class}</p>
			<p><strong>Race:</strong> {character.race}</p>
			<p><strong>Subrace:</strong> {character.subrace || 'None'}</p>
			<p><strong>Alignment:</strong> {character.alignment}</p>
			<p><strong>Age:</strong> {character.age}</p>
			<p><strong>Size:</strong> {character.size}</p>
			<p><strong>Speed:</strong> {character.speed} ft.</p>
			<p><strong>Level:</strong> {character.level?.['$numberInt'] || 1}</p>
			<p><strong>Proficiency Bonus:</strong> +{character.proficiency_bonus?.['$numberInt'] || 2}</p>
			<p><strong>Hit Die:</strong> d{character.hit_die?.['$numberInt'] || 10}</p>

			<h3 class="mt-4 text-xl font-bold">Ability Scores</h3>
			<ul class="grid grid-cols-3 gap-2">
				<li><strong>STR:</strong> {character.ability_scores.str || 0}</li>
				<li><strong>DEX:</strong> {character.ability_scores.dex || 0}</li>
				<li><strong>CON:</strong> {character.ability_scores.con || 0}</li>
				<li><strong>INT:</strong> {character.ability_scores.int || 0}</li>
				<li><strong>WIS:</strong> {character.ability_scores.wis || 0}</li>
				<li><strong>CHA:</strong> {character.ability_scores.cha || 0}</li>
			</ul>

			<h3 class="mt-4 text-xl font-bold">Proficiencies</h3>
			<ul>
				{#each character.proficiencies as proficiency}
					<li>{proficiency}</li>
				{/each}
			</ul>

			<h3 class="mt-4 text-xl font-bold">Languages</h3>
			<ul>
				{#each character.languages as language}
					<li>{language}</li>
				{/each}
			</ul>

			<h3 class="mt-4 text-xl font-bold">Traits</h3>
			<ul>
				{#each character.traits as trait}
					<li>{trait}</li>
				{/each}
			</ul>

			<h3 class="mt-4 text-xl font-bold">Features</h3>
			<ul>
				{#each character.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>

			<h3 class="mt-4 text-xl font-bold">Equipment</h3>
			<ul>
				{#each character.equipment as item}
					<li>
						<strong>{item.name}</strong> (x{item.count?.['$numberInt'] || 1}) - {item.weight?.[
							'$numberInt'
						] || 0} lbs, {item.cost?.quantity?.['$numberInt'] || 0}
						{item.cost?.unit}
					</li>
				{/each}
			</ul>
		</div>
	{/each}
{/await}
