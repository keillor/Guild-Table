<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { dnd5ApiDetails } from '$lib/api/dnd5api_client';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	const { item, type } = $props();

	let isOpen = $state(false);
	let requested = $state(false);
	let resolve = null;
	let reject = null;
	let promise = new Promise((newResolve, newReject) => {
		resolve = newResolve
		reject = newReject
	})

	console.log("Init", item);

	if (!requested) {
		console.log('requesting data;')
		requested = true;
		dnd5ApiDetails(`${type}/${item}`).then(resolve).catch((data) => {
			reject(data.body.message)
		});
	}
</script>


<ScrollArea class="p-6 h-min max-h-[500px] w-min w-[300px]">
	{#await promise}
		<div>
			<Circle />
			<span>loading...</span>
		</div>
	{:then details}
			{#if type == 'proficiencies'}
				<p class='underline'>Name: <span class='font-bold'>{details.name}</span></p>
				<p>Type: <span>{details.type}</span></p>
			{:else if type == 'traits'}
				<p class='underline'>Trait: <span class='font-bold'>{details.name}</span></p>
				<p class='text-wrap'>Description: {details.desc}</p>
			{:else if type == 'languages'}
				<p class='underline'>Language: <span class='font-bold'>{details.name}</span></p>
				<p>Type: <span>{details.type}</span></p>
				<p>Typical Speakers: <span>{details.typical_speakers}</span></p>
				<p class='text-wrap'>Description: {details.desc}</p>
			{:else if type == 'features'}
					<p class='underline'>Feature: <span class='font-bold'>{details.name}</span></p>
					<p class='text-wrap'>Description: {details.desc}</p>
			{/if}
	{:catch error}
		<p class="text-red-500">{error}</p>
	{/await}
</ScrollArea>

