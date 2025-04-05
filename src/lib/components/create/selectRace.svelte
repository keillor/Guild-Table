<script>
	import * as Select from '$lib/components/ui/select/index.js';
	import Label from '@/components/ui/label/label.svelte';
	import { dnd5ApiRaw } from '@/api/dnd5api';

	const { form, races, errors } = $props();

	const racesContent = $derived(
		races?.results?.find((f) => f.index === $form.race)?.name ?? 'Select a Race...'
	);
</script>

<Label for="race">Race</Label>
<Select.Root type="single" name="race" bind:value={$form.race}>
	<Select.Trigger class="w-[180px]" onclick={() => ($form.subrace = null)}>
		{racesContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each races.results as race}
				<Select.Item value={race.index} label={race.name}>{race.name}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
{#if $errors.race}<span class="font-bold text-destructive underline">{$errors.race}</span>{/if}