<script>
	//big symbols
	import { Badge } from '../ui/badge';

	//Combobox imports
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	//combobox end

	//shadcn components
	import Label from '@/components/ui/label/label.svelte';
	import { useId } from 'bits-ui';
	import { dnd5ApiEquipmentCategory } from '@/api/dnd5api_client';

	//data
	const { formInputName, formDisplayName, form, choices, equipIndex} = $props();

    const results = dnd5ApiEquipmentCategory(choices.choice.from.equipment_category.index);
	$form[formInputName] = [];
	//const allThings = choices;
	const choiceLimit = Number(choices.choice.choose);
	let limitReached = $derived($form[formInputName].length == choiceLimit);
	let open = $state(false);
	const triggerId = useId();

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>
{#await results}
    <p>Loading...</p>
{:then allThings}
<Label>{formDisplayName}</Label>
<Popover.Root bind:open>
	<Popover.Trigger disabled={limitReached}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="w-[200px] justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{`select ${choiceLimit - $form[formInputName].length} option${choiceLimit - $form[formInputName].length == 1 ? '' : 's'}`}
				<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder={'search...'} />
			<Command.List>
				<Command.Empty>{`No ${formDisplayName} found.`}</Command.Empty>
				<Command.Group>
					{#each allThings.equipment as option (option.index)}
						<Command.Item
							value={option.index}
							onSelect={() => {
								const exists = $form[formInputName].some((i) => i === option.index);
								if (!exists) {
									$form[formInputName] = [...$form[formInputName], option.index];
								} else {
									$form[formInputName] = $form[formInputName].filter(
										(l) => l !== option.index
									);
								}
								closeAndFocusTrigger();
							}}
						>
							<Check
								class={cn(
									$form[formInputName].some((l) => l === option.index) || 'text-transparent'
								)}
							/>
							{option.name}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
<div class="flex flex-row gap-2">
	{#each $form[formInputName] as item, index}
		<Badge
			class="flex h-min flex-row content-between gap-1  text-white"
			onclick={(event) => {
				event.preventDefault();
				$form[formInputName] = $form[formInputName].filter((l) => l !== item);
			}}
		>
			{allThings.equipment.find((i) => item === i.index).name}
		</Badge>
		<input hidden name={`${formInputName}_${equipIndex}_${index}`} value={JSON.stringify({[item]:1})}/>
	{/each}
</div>
{/await}