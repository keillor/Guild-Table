<script>
	import * as Select from '$lib/components/ui/select/index.js';
	import Label from '@/components/ui/label/label.svelte';

	const { form, classes, errors } = $props();

	const classesContent = $derived(
		classes?.results?.find((f) => f.index === $form.class)?.name ?? 'Select a Class...'
	);
</script>

<Label for="class">Class</Label>
<Select.Root type="single" name="class" bind:value={$form.class}>
	<Select.Trigger class="w-[180px]">
		{classesContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each classes.results as classes}
				<Select.Item value={classes.index} label={classes.name}>{classes.name}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
{#if $errors.class}<span class="font-bold text-red-500 underline">{$errors.class}</span>{/if}
