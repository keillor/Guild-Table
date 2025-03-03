<script lang='ts'>
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Pencil, Trash, Shield, Heart, Eye } from 'lucide-svelte/icons';
	import type { CharacterTypeTS } from '$lib/models/character.js';
	import as_mod_calc from '$lib/utilities/character/character_calculations.js';
	const {data, message} = $props();
	const characters : CharacterTypeTS[] = data.characters;
	/* const characters = [
		{
			name: 'Percy Jackson',
			race: 'Elf',
			class: 'Mage',
			level: 3,
			avatar: 'https://i.pinimg.com/736x/7f/f0/d8/7ff0d8a948987b7660a09fea4e7de228.jpg',
			campaign: 'Toads'
		},
		{
			name: 'Harry Potter',
			race: 'Human',
			class: 'Ranger',
			level: 3,
			avatar: 'https://assets-prd.ignimgs.com/2021/01/26/harry-potter-button-1611619333944.jpg',
			campaign: 'Toads'
		},
		{
			name: 'Hercules',
			race: 'Dragonborn',
			class: 'Rogue',
			level: 3,
			avatar:
				'https://s.yimg.com/ny/api/res/1.2/IvwOWc7HAW93981UTEeEYw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ1Mw--/https://media.zenfs.com/en/huffpost_uk_744/c3f7711ac372f2e3a47008733738a6ba',
			campaign: 'Toads'
		},
		{
			name: 'Spiderman',
			race: 'Spider',
			class: 'Bard',
			level: 3,
			avatar:
				'https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTc4NzQ2NjU0ODYxMTgw/tom-holland-spider-man-ftr.jpg',
			campaign: 'Toads'
		}
	]; */
	const as_names = ['cha', 'con', 'dex', 'int', 'str', 'wis'];
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Character Manage</h1>

<Card.Root class="p-3">
	<Button href="/character/create">Create New Character</Button>
</Card.Root>

<h2
	class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>
	Your Characters
</h2>

<div class="grid md:grid-cols-3 md:gap-3">
	{#each characters as character}
		<Card.Root>
			<Card.Header>
				<div class="flex flex-row items-center justify-between">
					<h3 class="text-xl font-semibold">{character.name}</h3>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="flex justify-between">
					<div class="flex flex-col">
						<p>Race: {character.race}</p>
						<p>Class: {character.class}</p>
						<p>Level: {character.level}</p>
						<p>Age: {character.age}</p>
						<p>Hit Die: {character.hit_die}d</p>
					</div>
					<div class="grid grid-cols-3 gap-5">
						<!-- <Shield class='size-12 border-2 rounded-md'/> -->
						{#each as_names as strKey}
							<div class="flex h-24 w-24 flex-col content-center justify-between rounded-lg border-2 p-1 text-center">
								<p class='underline'>{strKey}</p>
								<p class="text-xl font-bold">{character.ability_scores[strKey]}</p>
								<p class="h-min rounded-full border-2 px-2">{as_mod_calc(character.ability_scores[strKey])}</p>
							</div>
						{/each}
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button variant="outline">
					<Eye class="mr-2 size-4" />
					View
				</Button>
				<Button variant="outline">
					<Pencil class="mr-2 size-4" />
					Edit
				</Button>

				<AlertDialog.Root>
					<AlertDialog.Trigger variant='outline'>
						<Button variant="outline">
							<!-- THIS BUTTON MIGHT CAUSE HYDRATION ISSUES -->
							<Trash class="mr-2 size-4" />
							Delete
						</Button>
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
							<AlertDialog.Description>
								This action cannot be undone. This will permanently delete your account and remove
								your data from our servers.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<form method='POST' action='?/delete'>
								<input hidden name='id' value={character._id}/>
								<AlertDialog.Action class="bg-red-300 hover:bg-red-500">Delete</AlertDialog.Action>
							</form>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
