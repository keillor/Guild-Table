<script>
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import Label from '@/components/ui/label/label.svelte';
	import Badge from '../ui/badge/badge.svelte';
	import EquipmentCategory from './EquipmentCategory.svelte';

	//data
	const { formInputName, formDisplayName, form, choices, equipIndex } = $props();
	$form[formInputName] = [];
	//const choiceLimit = $derived(subSelect);
	let subSelect = $state(null);
	let selectedOption = $derived.by(() => {
		if (subSelect != null) {
			console.log(choices.from.options[subSelect]);
			return choices.from.options[subSelect];
		}
		return null;
	});

	let selectedOptionResult = $state('');
</script>


<Label>{choices.desc}</Label>
{#if choices.hasOwnProperty('from') && choices.from.option_set_type == 'equipment_category'}
<EquipmentCategory
			formDisplayName={choices.desc}
			formInputName={`equipment_${equipIndex}`}
			choices={{choice: choices}}
			{form}
		/>
{:else}
	<RadioGroup.Root
		bind:value={subSelect}
		name={`equipsubselect_${equipIndex}`}
	>
		{#each choices.from.options as option, index}
			<div class="flex flex-row">
				<RadioGroup.Item value={index} name={`${choices.desc}_index`} />
				<Label for={`${choices.desc}`}>{`Option ${index + 1}`}</Label>
			</div>
		{/each}
	</RadioGroup.Root>
{/if}

<div class="flex flex-row gap-2">
	{#if selectedOption != null && selectedOption.option_type == 'counted_reference'}
		<Badge
			class="flex h-min flex-row content-between gap-1  text-white"
			onclick={(event) => {
				event.preventDefault();
			}}
		>
			{selectedOption.count} x {selectedOption.of.name}
		</Badge>
		<input hidden name={`equipment_${equipIndex}`} value={JSON.stringify({[selectedOption.of.index] : selectedOption.count})}>
	{:else if selectedOption != null && selectedOption.option_type == 'multiple'}
		{#each selectedOption.items as item (item.of.index)}
			<Badge
				class="flex h-min flex-row gap-1 text-white"
				onclick={(event) => {
					event.preventDefault();
				}}
			>
				{item.count} x {item.of.name}
			</Badge>
		{/each}
		<input hidden name={`equipment_${equipIndex}`} value={JSON.stringify(selectedOption.items.map((t) => {
			return {[t.of.index]: t.count}
		}))}/>
	{:else if selectedOption != null && selectedOption.option_type == 'choice' && selectedOption.choice.from.option_set_type == 'equipment_category'}
		<EquipmentCategory
			formDisplayName={selectedOption.choice.desc}
			formInputName={`equipment_${equipIndex}_${subSelect}`}
			choices={selectedOption}
			{form}
		/>
	{/if}
</div>
