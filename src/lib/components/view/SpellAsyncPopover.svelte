<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { dnd5ApiSpellDetails } from '$lib/api/dnd5api_client';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from '../ui/button';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import SpellDetail from './SpellDetail.svelte';
	const { spell, children } = $props();

	let isOpen = $state(false);
	let requested = $state(false);
	let resolve = null;
	let promise = new Promise((newResolve, _) => (resolve = newResolve));

	const openChange = (open) => {
		if (open) {
			isOpen = open;
			if (!requested) {
				requested = true;
				dnd5ApiSpellDetails(spell).then(resolve);
			}
		} else {
			isOpen = open;
		}
	};
</script>

<Popover.Root open={isOpen} onOpenChange={(open) => openChange(open)}>
	<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>
		{@render children()}
	</Popover.Trigger>
	<Popover.Content>
		<ScrollArea class="h-min max-h-[500px]">
			{#await promise}
				<div>
					<Circle />
					<span>loading...</span>
				</div>
			{:then details}
				<SpellDetail spell={details}/>
			{:catch error}
				<p class="text-red-500">Error! Please try again later.</p>
			{/await}
		</ScrollArea>
	</Popover.Content>
</Popover.Root>
