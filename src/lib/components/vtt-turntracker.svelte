<script>
	import { ArrowDownUp, Dices } from 'lucide-svelte';
	import Checkbox from './ui/checkbox/checkbox.svelte';
	import Button from './ui/button/button.svelte';
	import { onMount } from 'svelte';
	import Input from './ui/input/input.svelte';
	import as_mod_calc from '$lib/utilities/character/character';

	let { parseName, allCharacters, abilityRoll } = $props();

	onMount(() => {
		allCharacters.forEach((char) => {
			if (!char.turntracker) {
				char.turntracker = { checked: false, value: 0 };
			}
		});
	});

	function rollForAll() {
		allCharacters.forEach((char) => {
			// Roll for the character's dexterity check
			const dex = as_mod_calc(char.ability_scores?.dex) || 0; // Default to 0 if dex is undefined
			char.turntracker.value = abilityRoll('dex', dex, 'Check');
		});
        sortCharacters();
	}

	function sortCharacters() {
		allCharacters.sort((a, b) => b.turntracker.value - a.turntracker.value);
	}
</script>

<div class="turn-tracker">
	<span class="flex flex-row items-center justify-between">
		<h2 class="text-2xl font-bold">Turn Tracker</h2>
		<Button variant="outline" onclick={sortCharacters}>
			<ArrowDownUp />
		</Button>
		<Button variant="outline" onclick={rollForAll}>
			<Dices />
		</Button>
	</span>
	<ul class="list-none p-0">
		{#each allCharacters as char, index}
			<li class="flex items-center gap-4 border-b p-2">
				<Checkbox bind:checked={char.turntracker.checked} />
				<span class="font-bold">{index + 1}.</span>
				<span>{parseName(char.name)}</span>
				<span class="ml-auto text-sm text-gray-500">DEX: {as_mod_calc(char.ability_scores?.dex) || 0}</span>
				<Input
					type="number"
					max="100"
					class="w-12 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					bind:value={char.turntracker.value}
				/>
			</li>
		{/each}
	</ul>
</div>

<style>
	.turn-tracker ul {
		margin: 0;
		padding: 0;
	}

	.turn-tracker li {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
