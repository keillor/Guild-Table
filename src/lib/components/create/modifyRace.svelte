<script>
    import { Input } from "$lib/components/ui/input/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import Label from "@/components/ui/label/label.svelte";
    import { CircleX } from 'lucide-svelte/icons';
	import ComboSelect from "./ComboSelect.svelte";
    import * as Select from "$lib/components/ui/select/index.js";
    const { form, errors, raceData, languages, proficiencies }= $props();

    const subracesContent = $derived(
        raceData?.subraces?.find((f) => f.index === $form.subrace)?.name ?? "Select a Subrace..."
    );

    $form.speed = raceData.speed;
    $form.alignment = raceData.alignment;
    $form.size = raceData.size;
    $form.size_description = raceData.size_description;
    $form.language_description = raceData.language_description;
</script>

<Label for='name'>Race</Label>
<Input name='name' bind:value={raceData.name} type='text' disabled />

<Label for='speed'>Speed</Label>
<Input name='speed' bind:value={$form.speed} type='number'/>

<!-- <Label for='ability_bonus'>Ability Bonus</Label>
<Input name='ability_bonus' bind:value={$form.ability_bonus} type='text'/> -->

<Label for='alignment'>Alignment</Label>
<Input name='alignment' bind:value={$form.alignment} type='text'/>

<Label for='age'>Age</Label>
<Input name='age' bind:value={$form.age} type='number'/>

<Label for='size'>Size</Label>
<Input name='size' bind:value={$form.size} type='text'/>

<Label for='size_description'>Size Description</Label>
<Input name='size_description' bind:value={$form.size_description} type='text'/>

<Label for='starting_proficiencies'>Starting Proficiencies</Label>
<Input name='starting_proficiencies' bind:value={$form.starting_proficiencies} type='text'/>

<!-- <Label for='starting_proficencies_options'>Starting Proficencies Options</Label>
<Input name='starting_proficencies_options' bind:value={$form.starting_proficencies_options} type='text'/>
 -->

<ComboSelect formInputName="starting_proficiencies" formDisplayName="Proficiencies" form={form} things={proficiencies} raceData={raceData}/>

<ComboSelect formInputName="languages" formDisplayName="Language" form={form} things={languages} raceData={raceData}/>


<Label for='language_description'>Description</Label>
<Input name='language_description' bind:value={$form.language_description} type='text'/>

<Label for='traits'>Traits</Label>
<Input name='traits' bind:value={$form.traits} type='text'/>


{#if raceData.subraces}
    <Label for='subrace'>Subrace</Label>
    <Select.Root type="single" name="subrace" bind:value={$form.subrace}>
        <Select.Trigger class="w-[180px]">
            {subracesContent}
        </Select.Trigger>
        <Select.Content>
            <Select.Group>
                <Select.Item value='' label='None' class='italic' onclick={() => {}}>none</Select.Item>
            {#each raceData.subraces as sub}
                <Select.Item value={sub.index} label={sub.name}>{sub.name}</Select.Item>
            {/each}
            </Select.Group>
        </Select.Content>
    </Select.Root>
{/if}


<!-- TODO: language_options, TODO: ability_bonus_options -->