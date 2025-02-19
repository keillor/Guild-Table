<script>
	import AbilityScores from "$lib/components/create/AbilityScores.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { stringInputNames, listInputNames, numberInputNames } from "../schema";

	const character = {
		[stringInputNames.name]: "Indiana Bones",
		[listInputNames.saving_throws]: ['int', 'cha'],
		[numberInputNames.proficiency_bonus]: '5'
	};


</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Ability Scores
  </h1>
  <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
    <b class='underline'>{character[stringInputNames.name]}</b> will have a proficiency bonus of <b class='underline'>+{character[numberInputNames.proficiency_bonus]}</b> when using:
  </h2>
  <ul class='my-6 ml-6 list-disc [&>li]:mt-2'>
	  {#each character[listInputNames.saving_throws] as as_name (as_name)}
	  	<li>{as_name}</li>
	  {/each}
  </ul>
  <Button>Save Progress</Button>


<AbilityScores />