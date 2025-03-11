<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { dnd5ApiEquipmentQuery, dnd5ApiSpellDetails } from '$lib/api/dnd5api_client';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from '../ui/button';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import EquipmentDetail from './EquipmentDetail.svelte';
	const { equipment, children } = $props();

	let isOpen = $state(false);
	let requested = $state(false);
	let resolve = null;
	let promise = new Promise((newResolve, _) => (resolve = newResolve));

	const openChange = (open) => {
		if (open) {
			isOpen = open;
			if (!requested) {
				requested = true;
				dnd5ApiEquipmentQuery(equipment).then(resolve);
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
		<ScrollArea class="max-h-[500px]">
			{#await promise}
				<div>
					<Circle />
					<span>loading...</span>
				</div>
			{:then details}
				<EquipmentDetail equipment={details}/>
			{:catch error}
				<p class="text-red-500">Error! Please try again later.</p>
			{/await}
		</ScrollArea>
	</Popover.Content>
</Popover.Root>
