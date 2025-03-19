<script lang='ts'>
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Card from '$lib/components/ui/card/index.js';
	import as_mod_calc from "$lib/utilities/character/character_calculations";
	import GenericAsyncPopover from "$lib/components/view/GenericAsyncPopover.svelte";

    const { data } = $props();
    const character = data.character;
    const as_names = ['cha', 'con', 'dex', 'int', 'str', 'wis'];
</script>

{#snippet chips(list, key)}
    <div class='flex flex-row gap-2'>
        {#each list as item}
        <Popover.Root>
            <Popover.Trigger>
                <Badge class='flex h-min flex-row content-between gap-1 text-white rounded-lg'>{item}</Badge>
            </Popover.Trigger>
            <Popover.Content>
                <GenericAsyncPopover {item} type={key}/>
            </Popover.Content>
        </Popover.Root>
        {/each}
    </div>
{/snippet}


{#snippet equipChips(list, key)}
    <div class='flex flex-row gap-2'>
        {#each list as item}
        <Popover.Root>
            <Popover.Trigger>
                <Badge class='flex h-min flex-row content-between gap-1 text-white rounded-lg'>{item.name} x {item.count}</Badge>
            </Popover.Trigger>
            <Popover.Content>
                <GenericAsyncPopover item={item.index} type={key}/>
            </Popover.Content>
        </Popover.Root>
        {/each}
    </div>
{/snippet}
<Card.Root>
	<Card.Header>
		<h1 class="lg:text-5x scroll-m-20 text-4xl font-extrabold tracking-tight">
			Name: <b class="underline">{character.name}</b>
		</h1>
	</Card.Header>
	<Card.Content>
        <p><b>Race:</b> {character.race}</p>
        <p><b>Class:</b> {character.class}</p>
        <p><b>Speed:</b> {character.speed}</p>
        <p><b>Age:</b> {character.name}</p>
        <p><b>Size:</b> {character.size}</p>
        <p><b>Description:</b> {character.size_description}</p>
        <p><b>Language Description:</b> {character.language_description}</p>
        <p><b>Spellcasting Ability:</b> {character.spellcasting_ability}</p>
        <p><b>Ability Score Bonus:</b> {character.as_bonus}</p>
        <p>Level: {character.level}</p>
        <p><b>Proficiency Bonus:</b> {character.proficiency_bonus}</p>
        <p><b>Spellcasting level:</b> {character.spellcasting_level}</p>
        <p><b>Hit Die:</b> d{character.hit_die}</p>

        <p><b>Proficiencies:</b></p>
        {@render chips(character.proficiencies, 'proficiencies')}

        <p><b>Languages:</b></p>
        {@render chips(character.languages, 'languages')}

        <p><b>Traits:</b></p>
        {@render chips(character.traits, 'traits')}
 
        <p><b>Features:</b></p>
        {@render chips(character.features, 'features')}

        <p><b>Saving Throws:</b></p>
        {@render chips(character.saving_throws, 'saving_throws')}

        <p><b>Ability Scores:</b></p>
        <div class="flex flex-row gap-2">
            <!-- <Shield class='size-12 border-2 rounded-md'/> -->
             {#if character.ability_scores !== undefined}
                {#each as_names as strKey}
                    <div class="flex h-24 w-24 flex-col content-center justify-between rounded-lg border-2 p-1 text-center">
                        <p class='underline'>{strKey}</p>
                        <p class="text-xl font-bold">{character.ability_scores[strKey]}</p>
                        <p class="h-min rounded-full border-2 px-2">{as_mod_calc(character.ability_scores[strKey])}</p>
                    </div>
                {/each}
            {:else}
                <div class='col-span-3 flex flex-col content-center justify-around'>
                    <p><b>Whoops!</b> Looks like this character doesn't any ability scores yet.</p>
                    <Button href={`/character/create/scores/${character._id}`} class={buttonVariants({variant: 'destructive'})}>Add Ablity Scores</Button>
                </div>
             {/if}
        </div>

        <p><b>Spells:</b></p>
        {#each Object.entries(character.spells) as [key, value]}
            Level {key} Spels:
            {@render chips(value, 'spells')}
        {/each}

        <p><b>Equipment:</b></p>
        {@render equipChips(character.equipment, 'equipment')}

	</Card.Content>
	<Card.Footer class='flex flex-col'>
		<h3 class="font-bold">Relevant Links:</h3>
		<a class="underline" href={`/character/create/scores/${character._id}`}>Edit Ability Scores</a>
        <a class="underline" href={`/character/${character._id}`}>Edit Character</a>
	</Card.Footer>
</Card.Root>

