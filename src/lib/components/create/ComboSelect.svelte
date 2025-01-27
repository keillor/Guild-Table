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
	const { formInputName, formDisplayName, form, things, raceData } = $props();
	$form[formInputName] = raceData[formInputName].map((t) => {
		return t.index;
	});
	const allThings = things;
	let open = $state(false);
	const triggerId = useId();

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Label>{formDisplayName}</Label>
<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="w-[200px] justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{`Additional ${formDisplayName}`}
				<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder={`Search ${formDisplayName}`} />
			<Command.List>
				<Command.Empty>{`No ${formDisplayName} found.`}</Command.Empty>
				<Command.Group>
					{#each allThings.results as item (item.index)}
						<Command.Item
							value={item.index}
							onSelect={() => {
								const exists = $form[formInputName].some((i) => i === item.index);
								if (!exists) {
									$form[formInputName] = [...$form[formInputName], item.index];
								} else {
									$form[formInputName] = $form[formInputName].filter((l) => l !== item.index);
								}
								closeAndFocusTrigger();
							}}
						>
							<Check
								class={cn($form[formInputName].some((l) => l === item.index) || 'text-transparent')}
							/>
							{item.name}
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
			{allThings.results.find((i) => item === i.index).name}
		</Badge>
	{/each}
</div>
<input hidden bind:value={$form[formInputName]} name={formInputName} />
