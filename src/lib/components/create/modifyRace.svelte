<script>
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from '$lib/components/ui/card/index';
    import Label from "@/components/ui/label/label.svelte";
	import ComboSelect from "./ComboSelect.svelte";
    import * as Select from "$lib/components/ui/select/index.js";
	import AbilityScoreBonus from "./abilityScoreBonus.svelte";
	import OptionSelect from "./OptionSelect.svelte";
    const { form, errors, raceData, languages, proficiencies, traits }= $props();

    const subracesContent = $derived(
        raceData?.subraces?.find((f) => f.index === $form.subrace)?.name ?? "Select a Subrace..."
    );

    let options = []
    for (let key in raceData) {
        if(key.endsWith('options')) {
            options.push({data: raceData[key], displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()), key: key});
        }
    }
    //input initilization.
    $form.speed = raceData.speed;
    $form.alignment = raceData.alignment;
    $form.size = raceData.size;
    $form.size_description = raceData.size_description;
    $form.language_desc = raceData.language_desc;
</script>

{#if options.length > 0}
    <Card.Root>
        <Card.Header>
            <h2 class='text-xl font-bold'>Race Options</h2>
        </Card.Header>
        <Card.Content>
            {#each options as option (option.key)}
                <OptionSelect formInputName={option.key} formDisplayName={option.displayValue} form={form} choices={option.data}/> 
            {/each}
        </Card.Content>
    </Card.Root>
{/if}


<Card.Root>
    <Card.Header>
        <h2 class='text-xl font-bold'>Race Defaults</h2>
    </Card.Header>
    <Card.Content>
        <Label for='name'>Race</Label>
        <Input name='name' value={raceData.name} type='text' disabled />
        
        <Label for='speed'>Speed</Label>
        <Input name='speed' value={$form.speed} type='number'/>
        
        <!-- <Label for='ability_bonus'>Ability Bonus</Label>
        <Input name='ability_bonus' bind:value={$form.ability_bonus} type='text'/> -->
        
        <Label for='alignment'>Alignment</Label>
        <Input name='alignment' value={$form.alignment} type='text'/>
        
        <Label for='age'>Age</Label>
        <Input name='age' value={$form.age} type='number'/>
        
        <Label for='size'>Size</Label>
        <Input name='size' value={$form.size} type='text'/>
        
        <Label for='size_description'>Size Description</Label>
        <Input name='size_description' value={$form.size_description} type='text'/>
        
        
        <AbilityScoreBonus ability_scores={raceData.ability_bonuses} form={form} />
        
        <ComboSelect formInputName="starting_proficiencies" formDisplayName="Proficiencies" form={form} things={proficiencies} raceData={raceData}/>
        
        <ComboSelect formInputName="traits" formDisplayName="Traits" form={form} things={traits} raceData={raceData}/>
        
        <ComboSelect formInputName="languages" formDisplayName="Languages" form={form} things={languages} raceData={raceData}/>
        
        <Label for='language_desc'>Language  Description</Label>
        <Input name='language_desc' value={$form.language_desc} type='text'/>
        
        {#if raceData.subraces.length > 0}
            <Label for='subrace'>Subrace</Label>
            <Select.Root type="single" name="subrace" value={$form.subrace}>
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
    </Card.Content>
</Card.Root>




<!-- TODO: language_options, TODO: ability_bonus_options -->