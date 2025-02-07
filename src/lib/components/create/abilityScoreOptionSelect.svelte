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

	//data
	const { formInputName, form, choices } = $props();
	$form[formInputName] = [];
	const allThings = choices;
	const choiceLimit = Number(choices.choose);
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

<Label>Ability Bonus Options</Label>
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
					{#each allThings.from.options as option (option.ability_score.index)}
						<Command.Item
							value={option.ability_score.index}
							onSelect={() => {
								const exists = $form[formInputName].some((i) => i === option.ability_score.index);
								if (!exists) {
									$form[formInputName] = [...$form[formInputName], option.ability_score.index];
								} else {
									$form[formInputName] = $form[formInputName].filter(
										(l) => l !== option.ability_score.index
									);
								}
								closeAndFocusTrigger();
							}}
						>
							<Check
								class={cn(
									$form[formInputName].some((l) => l === option.ability_score.index) || 'text-transparent'
								)}
							/>
							{option.ability_score.name}: +{option.bonus}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
<div class="flex flex-row gap-2">
	{#each $form[formInputName] as item (item)}
		<Badge
			class="flex h-min flex-row content-between gap-1  text-white"
			onclick={(event) => {
				event.preventDefault();
				$form[formInputName] = $form[formInputName].filter((l) => l !== item);
			}}
		>
			{allThings.from.options.find((i) => item === i.ability_score.index).ability_score.name}: +{allThings.from.options.find((i) => item === i.ability_score.index).bonus}
		</Badge>
		<input hidden value={JSON.stringify({[item]: allThings.from.options.find((i) => item === i.ability_score.index).bonus})} name={`${formInputName}_${item}`}/>
	{/each}
</div>
