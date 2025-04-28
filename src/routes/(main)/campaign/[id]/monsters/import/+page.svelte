<script lang="ts">
	import { dnd5ApiAllMonster } from '$lib/api/dnd5api_client';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Plus } from 'lucide-svelte';

	const { data } = $props();

	let monsterPromise = data.monsterPromise;

	let filterInput = $state('');
</script>

<h1 class="text-3xl font-bold">Import Monsters</h1>

{#await monsterPromise}
	<span>Loading monsters...</span>
{:then allMonsters}
	<Label for="monster_filter">Filter Monters</Label>
	<Input name="monster_filter" placeholder="Monster filter" bind:value={filterInput} />

	<div class='flex flex-col gap-2'>
        {#each allMonsters.results.filter((m) => m.index.includes(filterInput)) as monster}
            <div class="flex flex-row items-center justify-between">
                <p>{monster.name}</p>
                <form action='?/importMonster' method="POST">
                    <Button type='submit' variant="outline" class='gap-2 items-center'>
                        Import <Plus />
                    </Button>
                    <input hidden name='monsterIndex' value={monster.index}/>
                </form>
            </div>
        {/each}
    </div>
{/await}
