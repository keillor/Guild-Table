<script>
	import { superForm, superValidate } from 'sveltekit-superforms';
	import Button from '@/components/ui/button/button.svelte';
	import SelectRace from '@/components/create/selectRace.svelte';
	import SelectClass from '@/components/create/selectClass.svelte';
	import ModifyRace from '@/components/create/modifyRace.svelte';
	import ModifyClass from '@/components/create/modifyClass.svelte';
	import AbilityScores from '$lib/components/create/AbilityScores.svelte';
	import { stringInputNames } from './schema.js';
	let { data } = $props();
	const races = data.results.races;
	const classes = data.results.classes;
	const raceData = data.results.raceData;
	const allLanguages = data.results.languages;
	const proficiencies = data.results.proficiencies;
	const traits = data.results.traits;
	const classData = data.results.classData;
	const levelData = data.results.levelData;
	const equipmentData = data.results.equipmentData;
	const features = data.results.features;
	const spells = data.results.spells;

	const { form, formId, errors, message, capture, restore } = superForm(data.form, {
		resetForm: false,
		clearOnSubmit: false
	});

	export const snapshot = { capture, restore };

	// Set the initial form step to `1` if not supplied in the request.
	let step = $state($message?.step ?? 1);

	function goBack(event) {
		event.preventDefault();
		history.back();
	}
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Create a Character</h1>

{#if $message?.text}<h3 class="text-green-500">{$message.text}</h3>{/if}

<form method="POST" action="?/next">
	<input type="hidden" name="step" value={step} />
	<input type="hidden" name="__superform_id" value={$formId} />
	{#if step == 1}
		<SelectRace {races} {errors} {form} />
		<SelectClass {classes} {errors} {form} />

		<Button onclick={(event) => goBack(event)}>Cancel</Button>
		<Button type="submit">Next</Button>
	{:else if step == 2}
		<input type="hidden" name={stringInputNames.race} value={$form.race} />
		<input type="hidden" name={stringInputNames.class} value={$form.class} />

		<ModifyRace {raceData} {form} {errors} languages={allLanguages} {proficiencies} {traits} />
		<ModifyClass {classData} {levelData} {form} equipment={equipmentData} {proficiencies} {features} {spells}/>

		<Button onclick={(event) => goBack(event)}>Back</Button>
		<Button type="submit">Save</Button>
	{:else}
		<AbilityScores />
	{/if}
</form>