<script>
	import * as Select from '$lib/components/ui/select/index.js';
	import Label from '@/components/ui/label/label.svelte';
	import { dnd5ApiRaw } from '@/api/dnd5api';

	const { form, races, errors } = $props();

	const racesContent = $derived(
		races?.results?.find((f) => f.index === $form.race)?.name ?? 'Select a Race...'
	);
	/*     const selectedRaceURL = $derived(
        races?.results?.find((f) => f.index === $form.race)?.url ?? null);

    const subraces = $derived.by(async () => {
        console.log('derive subraces')
        if (selectedRaceURL === null) {
            return null;
        }
        const raceResults = await dnd5ApiRaw(selectedRaceURL);
        if (raceResults['subraces'].length >= 1) {
            console.log(raceResults['subraces']);
            return raceResults['subraces'];
        } else {
            return null;
        }
    })
 */
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
{#if $errors.race}<span class="font-bold text-red-500 underline">{$errors.race}</span>{/if}

<!-- {#await subraces}

{:then data}
    {#if data == null }
        <div></div>
    {:else}
        <Label for='subrace'>Subrace</Label>
        <Select.Root type="single" name="subrace" bind:value={$form.subrace}>
            <Select.Trigger class="w-[180px]">
                {$form.subrace}
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    <Select.Item value='' label='None' class='italic' onclick={() => {}}>none</Select.Item>
                {#each data as subrace}
                    <Select.Item value={subrace.index} label={subrace.name}>{subrace.name}</Select.Item>
                {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    {/if}
{/await} -->
