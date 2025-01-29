<script>
	import ClassOptionSelect from './ClassOptionSelect.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import EquipmentOptionSelect from './EquipmentOptionSelect.svelte';

	const { classData, levelData, equipment,form } = $props();

	let choices = [];
	for (let key in classData) {
		if (key.endsWith('choices')) {
			choices.push({
				data: classData[key],
				displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
				key: key
			});
		}
	}

	let options = [];
	for (let key in classData) {
		if (key.endsWith('options')) {
			options.push({
				data: classData[key],
				displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
				key: key
			});
		}
	}
</script>

{#if choices.length > 0}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Class Choices</h2>
		</Card.Header>
		<Card.Content>
			{#each choices as thing (thing.key)}
				{#each thing.data as option, index}
					<ClassOptionSelect
						formInputName={option.desc}
						formDisplayName={option.desc}
						{form}
						choices={option}
						classIndex={index}
					/>
				{/each}
			{/each}
		</Card.Content>
	</Card.Root>
{/if}


{#if options.length > 0}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Class Options</h2>
		</Card.Header>
		<Card.Content>
			{#each options as thing (thing.key)}
				{#each thing.data as option, equipIndex}
					<EquipmentOptionSelect
						formInputName={option.desc}
						formDisplayName={option.desc}
						form={form}
						choices={option}
						equipIndex={equipIndex}
					/>
				{/each}
			{/each}
		</Card.Content>
	</Card.Root>
{/if}
