<script>
// @ts-nocheck

    import SuperDebug, { superForm, superValidate } from "sveltekit-superforms";
    import * as Select from "$lib/components/ui/select/index.js";
	import Button from "@/components/ui/button/button.svelte";
	import Label from "@/components/ui/label/label.svelte";
	import { zod } from "sveltekit-superforms/adapters";
	import { newClassSchema, newRaceSchema } from "./schema.js";
    let {data} = $props();
    const races = data.races;
    const classes = data.classes;
    
    
    const {form, formId, errors, message, capture, restore} = superForm(data.form, {
        resetForm: false,
        clearOnSubmit: false,
    });

    export const snapshot = { capture, restore };

    // Set the initial form step to `1` if not supplied in the request.
    let step = $state($message?.step ?? 1);
    console.log(`INITIAL STEP: ${$message?.step}`)
    const racesContent = $derived(
        races?.results?.find((f) => f.index === $form.race)?.name ?? "Select a Race..."
    );
    const classesContent = $derived(
        classes?.results?.find((f) => f.index === $form.class)?.name ?? "Select a Class..."
    );
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Create a Character
</h1>

{#if $message?.text}<h3 class="text-green-500">{$message.text}</h3>{/if}

<form method='POST' action='?/next'>
	<input type="hidden" name="step" bind:value={step} />
	<input type="hidden" name="__superform_id" bind:value={$formId} />
     {#if step == 1}
        <Label for='race'>Race</Label>
        <Select.Root type="single" name="race" bind:value={$form.race}>
            <Select.Trigger class="w-[180px]">
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
        {#if $errors.race}<span class="text-red-500 font-bold underline">{$errors.race}</span>{/if}
        <Button disabled>Back</Button>
        <Button type='submit'>Next</Button>
    {:else}
        <input type='hidden' name='race' bind:value={$form.race}/>
        <Label for='class'>Class</Label>
        <Select.Root type="single" name="class" bind:value={$form.class}>
            <Select.Trigger class="w-[180px]">
                {classesContent}
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                {#each classes.results as classes}
                    <Select.Item value={classes.index} label={classes.name}>{classes.name}</Select.Item>
                {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        {#if $errors.class}<span class="text-red-500 font-bold underline">{$errors.class}</span>{/if}
        <Button on:click={() => history.back()}>Back</Button>
        <Button type='submit'>Save</Button>
    {/if}

</form>     