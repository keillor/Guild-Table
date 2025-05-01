<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index';
	import Label from '@/components/ui/label/label.svelte';
	import ComboSelect from './ComboSelect.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import AbilityScoreBonus from './abilityScoreBonus.svelte';
	import OptionSelect from './OptionSelect.svelte';
	import AbilityScoreOptionSelect from './abilityScoreOptionSelect.svelte';
	import { abilityInputNames, listInputNames, numberInputNames, stringInputNames } from '../../../routes/(main)/character/create/schema';
	const { form, errors, raceData, languages, proficiencies, traits } = $props();

	const subracesContent = $derived(
		raceData?.subraces?.find((f) => f.index === $form.subrace)?.name ?? 'Select a Subrace...'
	);

	let options = [];
	for (let key in raceData) {
		if (key.endsWith('options')) {
			options.push({
				data: raceData[key],
				displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
				key: key
			});
		}
	}
	//input initilization.
	$form.speed = raceData.speed;
	$form.alignment = raceData.alignment;
	$form.size = raceData.size;
	$form.size_description = raceData.size_description;
	$form.language_desc = raceData.language_desc;
</script>

{#if options.length > 0}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Race Options</h2>
		</Card.Header>
		<Card.Content>
			{#each options as option (option.key)}
				{#if option.key == 'ability_bonus_options'}
					<AbilityScoreOptionSelect {form} choices={option.data} formInputName={abilityInputNames.as_bonus_race_option}/>
				{:else}
					<OptionSelect
						formInputName={option.key}
						formDisplayName={option.displayValue}
						{form}
						choices={option.data}
					/>
				{/if}
			{/each}
		</Card.Content>
	</Card.Root>
{/if}

<Card.Root>
	<Card.Header>
		<h2 class="text-xl font-bold">Race Defaults</h2>
	</Card.Header>
	<Card.Content>
		<Label for='name'>Name</Label>
		<Input name={stringInputNames.name} required type='text'/>

		<Label for="name">Race</Label>
		<Input name={stringInputNames.race} value={raceData.name} type="text" disabled />

		<Label for="hp">HP</Label>
		<Input name={numberInputNames.hp} value={$form.hp} type="number" />

		<Label for="speed">Speed</Label>
		<Input name={stringInputNames.speed} value={$form.speed} type="number" />

		<!-- <Label for='ability_bonus'>Ability Bonus</Label>
        <Input name='ability_bonus' bind:value={$form.ability_bonus} type='text'/> -->

		<Label for="alignment">Alignment</Label>
		<Input name={stringInputNames.alignment} value={$form.alignment} type="text" />

		<Label for="age">Age</Label>
		<Input name={stringInputNames.age} value={$form.age} type="number" />

		<Label for="size">Size</Label>
		<Input name={stringInputNames.size} value={$form.size} type="text" />

		<Label for="size_description">Size Description</Label>
		<Input name={stringInputNames.size_description} value={$form.size_description} type="text" />

		<AbilityScoreBonus ability_scores={raceData.ability_bonuses} {form} formInputName={abilityInputNames.as_bonus_race}/>

		<ComboSelect
			formInputName={listInputNames.starting_proficiencies}
			formDisplayName="Proficiencies"
			{form}
			things={proficiencies}
			{raceData}
		/>

		<ComboSelect
			formInputName={listInputNames.traits}
			formDisplayName="Traits"
			{form}
			things={traits}
			{raceData}
		/>

		<ComboSelect
			formInputName={listInputNames.languages}
			formDisplayName="Languages"
			{form}
			things={languages}
			{raceData}
		/>

		<Label for="language_desc">Language Description</Label>
		<Input name={stringInputNames.language_desc} value={$form.language_desc} type="text" />

		{#if raceData.subraces.length > 0}
			<Label for="subrace">Subrace</Label>
			<Select.Root type="single" name={stringInputNames.subrace} value={$form.subrace}>
				<Select.Trigger class="w-[180px]">
					{subracesContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Item value="" label="None" class="italic" onclick={() => {}}>none</Select.Item>
						{#each raceData.subraces as sub}
							<Select.Item value={sub.index} label={sub.name}>{sub.name}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		{/if}
	</Card.Content>
</Card.Root>
