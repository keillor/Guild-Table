<script lang='ts'>
	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Pencil, Trash, Shield, Heart, Eye, Plus } from 'lucide-svelte/icons';
	import type { CharacterTypeTS } from '$lib/models/character.js';
	import as_mod_calc from '$lib/utilities/character/character_calculations.js';
	import { enhance } from '$app/forms';
	const {data, message} = $props();
	let characters : CharacterTypeTS[] = $state(data.characters);
	const as_names = ['cha', 'con', 'dex', 'int', 'str', 'wis'];
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Character Manage</h1>

<Card.Root class="p-3">
	<Button href="/character/create">
		<Plus class="mr-2 size-4" />
		Create New Character
	</Button>
</Card.Root>

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
				<div class="flex flex-row items-center justify-between">
					<h3 class="text-xl font-semibold">{character.name}</h3>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="flex justify-between flex-wrap">
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
								<div class="flex h-24 w-24 flex-col content-center justify-between rounded-lg border-2 p-1 text-center">
									<p class='underline'>{strKey}</p>
									<p class="text-xl font-bold">{character.ability_scores[strKey]}</p>
									<p class="h-min rounded-full border-2 px-2">{as_mod_calc(character.ability_scores[strKey])}</p>
								</div>
							{/each}
						{:else}
							<div class='col-span-3 flex flex-col content-center justify-around'>
								<p><b>Whoops!</b> Looks like this character doesn't any ability scores yet.</p>
								<Button href={`/character/create/scores/${character._id}`} class={buttonVariants({variant: 'destructive'})}>Add Ablity Scores</Button>
							</div>
						 {/if}
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button href={`/character/${character._id}/view`} variant="outline">
					<Eye class="mr-2 size-4" />
					View
				</Button>
				<Button href={`/character/${character._id}`} variant="outline">
					<Pencil class="mr-2 size-4" />
					Edit
				</Button>

				<AlertDialog.Root>
					<AlertDialog.Trigger class={buttonVariants({variant: 'outline'})}>
							<Trash class="mr-2 size-4" />
							Delete
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
							<AlertDialog.Description>
								This action cannot be undone. This will permanently delete your character and remove
								your them from our servers.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel type='button'>Cancel</AlertDialog.Cancel>
							<form method='POST' action='?/delete' use:enhance={() => {
								return async({result}) => {
									const results = await result;
									console.log(results);
									characters = characters.filter((c) => c._id !== character._id);
								}
							}}>
								<input hidden name='id' value={character._id}/>
								<AlertDialog.Action class={buttonVariants({variant: 'destructive'})}>Delete</AlertDialog.Action>
							</form>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
{:else}
<p>Looks like you don't have any characters yet. Click the button above to get started!</p>
{/if}
