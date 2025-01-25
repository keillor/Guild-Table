<script>
    import { Input } from "$lib/components/ui/input/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import Label from "@/components/ui/label/label.svelte";
    import { CircleX } from 'lucide-svelte/icons';
	import ComboSelect from "./ComboSelect.svelte";
    import * as Select from "$lib/components/ui/select/index.js";
	import AbilityScoreBonus from "./abilityScoreBonus.svelte";
    const { form, errors, raceData, languages, proficiencies, traits }= $props();

    const subracesContent = $derived(
        raceData?.subraces?.find((f) => f.index === $form.subrace)?.name ?? "Select a Subrace..."
    );

    console.log(raceData);

    $form.speed = raceData.speed;
    $form.alignment = raceData.alignment;
    $form.size = raceData.size;
    $form.size_description = raceData.size_description;
    $form.language_desc = raceData.language_desc;
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

<!-- <Label for='starting_proficencies_options'>Starting Proficencies Options</Label>
<Input name='starting_proficencies_options' bind:value={$form.starting_proficencies_options} type='text'/>
 -->

<AbilityScoreBonus ability_scores={raceData.ability_bonuses} form={form} />

<ComboSelect formInputName="starting_proficiencies" formDisplayName="Proficiencies" form={form} things={proficiencies} raceData={raceData}/>

<ComboSelect formInputName="traits" formDisplayName="Trait" form={form} things={traits} raceData={raceData}/>

<ComboSelect formInputName="languages" formDisplayName="Language" form={form} things={languages} raceData={raceData}/>

<Label for='language_desc'>Language  Description</Label>
<Input name='language_desc' bind:value={$form.language_desc} type='text'/>


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