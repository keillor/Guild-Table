<script>
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import Label from '@/components/ui/label/label.svelte';
	import Badge from '../ui/badge/badge.svelte';
	import EquipmentCategory from './EquipmentCategory.svelte';
	import EquipmentPackGenerate from './EquipmentPackGenerate.svelte';

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
</script>


<Label>{choices.desc}</Label>
{#if choices.hasOwnProperty('from') && choices.from.option_set_type == 'equipment_category'}
<EquipmentCategory
			formDisplayName={choices.desc}
			formInputName={`${formInputName}_${equipIndex}`}
			choices={{choice: choices}}
			{equipIndex}
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
		{#key selectedOption.of.index}
			{#if String(selectedOption.of.index).endsWith("-pack")}
				<EquipmentPackGenerate uri={String(selectedOption.of.index)} {equipIndex} formInputName={formInputName}/>
			{:else}
			<Badge
			class="flex h-min flex-row content-between gap-1  text-white"
			onclick={(event) => {
				event.preventDefault();
				}}
			>
				{selectedOption.count} x {selectedOption.of.name}
			</Badge>
			<input hidden name={`${formInputName}_${equipIndex}`} value={JSON.stringify({[selectedOption.of.index] : selectedOption.count})}>
			{/if}
		{/key}
	{:else if selectedOption != null && selectedOption.option_type == 'multiple'}
		{#each selectedOption.items as item, index}
			{#if item.option_type == 'counted_reference'}
				<Badge
					class="flex h-min flex-row gap-1 text-white"
					onclick={(event) => {
						event.preventDefault();
					}}
				>
					{item.count} x {item.of.name}
				</Badge>
				<input hidden name={`${formInputName}_${equipIndex}_${index}`} value={JSON.stringify({[item.of.index] : item.count})}/>
			{:else}
				<EquipmentCategory
				formDisplayName={item.choice.desc}
				formInputName={`${formInputName}_${equipIndex}_${subSelect}`}
				choices={item}
				{equipIndex}
				{form}/>
			{/if}
			
		{/each}
	{:else if selectedOption != null && selectedOption.option_type == 'choice' && selectedOption.choice.from.option_set_type == 'equipment_category'}
		<EquipmentCategory
			formDisplayName={selectedOption.choice.desc}
			formInputName={`${formInputName}_${equipIndex}_${subSelect}`}
			choices={selectedOption}
			{form}
			{equipIndex}
		/>
	{/if}
</div>
