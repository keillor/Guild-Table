<script>
	import AbilityScores from "$lib/components/create/AbilityScores.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { stringInputNames, listInputNames, numberInputNames } from "../../schema";
	import * as Card from '$lib/components/ui/card/index';
	import {characterType} from '$lib/models/character';

	const { data } = $props();
	const fetchedCharacter = data.singleCharacter;
	let bonusScores = $state(fetchedCharacter[characterType.as_bonus_mod]);
	let scores = $state({
		cha: 0,
		con: 0,
		dex: 0,
		int: 0,
		str: 0,
		wis: 0
	})
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Ability Scores
  </h1>
  <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
    <b class='underline'>{fetchedCharacter[stringInputNames.name]}</b> will have a proficiency bonus of <b class='underline'>+{fetchedCharacter[numberInputNames.proficiency_bonus]}</b> when using:
  </h2>
  <ul class='my-6 ml-6 list-disc [&>li]:mt-2'>
	  {#each fetchedCharacter[listInputNames.saving_throws] as as_name (as_name)}
	  	<li>{as_name}</li>
	  {/each}
  </ul>

<Card.Root>
	<Card.Content>
		<AbilityScores abilityScores={scores} {bonusScores}/>
	</Card.Content>
	<Card.Footer>
		<Button>Save Progress</Button>
	</Card.Footer>
</Card.Root>

  