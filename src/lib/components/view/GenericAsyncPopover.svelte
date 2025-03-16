<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { dnd5ApiDetails, dnd5ApiSpellDetails } from '$lib/api/dnd5api_client';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from '../ui/button';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	const { item, children } = $props();

	let isOpen = $state(false);
	let requested = $state(false);
	let resolve = null;
	let reject = null;
	let promise = new Promise((newResolve, newReject) => {
		resolve = newResolve
		reject = newReject
	});

	const openChange = (open) => {
		if (open) {
			isOpen = open;
			if (!requested) {
				requested = true;
				dnd5ApiDetails(item).then(resolve).catch((data) => {
					reject(data.body.message)
				});
			}
		} else {
			isOpen = open;
		}
	};
</script>

<Popover.Root open={isOpen} onOpenChange={(open) => openChange(open)}>
	<Popover.Trigger>
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
				{details}
			{:catch error}
				<p class="text-red-500">{error}</p>
			{/await}
		</ScrollArea>
	</Popover.Content>
</Popover.Root>
