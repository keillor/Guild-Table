<script>
    import { Input } from "$lib/components/ui/input/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import Label from "@/components/ui/label/label.svelte";
    import { CircleX } from 'lucide-svelte/icons';
    const { form, errors, raceData }= $props();
    console.log(raceData);
    $form.languages = raceData.languages
    console.log($form.languages);
</script>

<Label for='name'>Race Name</Label>
<Input name='name' bind:value={$form.name} type='text' />

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
<Label for='languages'>Languages</Label>
<Input name='languages' bind:value={$form.languages} type='text'/>
<div class='flex flex-row gap-2'>
    {#each $form.languages as lang (lang.index)}
        <Badge class='flex flex-row content-between gap-1 text-white w-min' onclick={(event) => {
            event.preventDefault();
            $form.languages = $form.languages.filter((l) => l.index !== lang.index);
        }}>
            {lang.name}
            <CircleX />
        </Badge>
    {/each}
</div>


<Label for='language_description'>Description</Label>
<Input name='language_description' bind:value={$form.language_description} type='text'/>

<Label for='traits'>Traits</Label>
<Input name='traits' bind:value={$form.traits} type='text'/>

<Label for='subrace'>Subrace</Label>
<Input name='subrace' bind:value={$form.subrace} type='text'/>

<!-- TODO: language_options, TODO: ability_bonus_options -->