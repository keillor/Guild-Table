<script>
	import ClassOptionSelect from './ClassOptionSelect.svelte';
	import * as Card from '$lib/components/ui/card/index';

	const { classData, levelData, form } = $props();

	let options = [];
	for (let key in classData) {
		if (key.endsWith('choices')) {
			options.push({
				data: classData[key],
				displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
				key: key
			});
		}
	}
</script>

{#if options.length > 0}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Class Options</h2>
		</Card.Header>
		<Card.Content>
			{#each options as thing (thing.key)}
				{#each thing.data as option (option.desc)}
					<ClassOptionSelect
						formInputName={option.desc}
						formDisplayName={option.desc}
						{form}
						choices={option}
					/>
				{/each}
			{/each}
		</Card.Content>
	</Card.Root>
{/if}
