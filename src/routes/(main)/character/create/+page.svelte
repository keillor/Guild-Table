<script>
// @ts-nocheck

    import SuperDebug, { superForm, superValidate } from "sveltekit-superforms";
    import * as Select from "$lib/components/ui/select/index.js";
	import Button from "@/components/ui/button/button.svelte";
	import Label from "@/components/ui/label/label.svelte";
	import { zod } from "sveltekit-superforms/adapters";
	import { newClassSchema, newRaceSchema } from "./schema.js";
	import SelectRace from "@/components/create/selectRace.svelte";
	import SelectClass from "@/components/create/selectClass.svelte";
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
    console.log(`INITIAL STEP: ${$message?.step}`);

    function goBack(event) {
        event.preventDefault();
        history.back();
    }
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Create a Character
</h1>

{#if $message?.text}<h3 class="text-green-500">{$message.text}</h3>{/if}

<form method='POST' action='?/next'>
	<input type="hidden" name="step" bind:value={step} />
	<input type="hidden" name="__superform_id" bind:value={$formId} />
     {#if step == 1}
        <SelectRace errors={errors} races={races} form={form} />
        <Button onclick={(event) => goBack(event)}>Back</Button>
        <Button type='submit'>Next</Button>
    {:else}
        <input type='hidden' name='race' bind:value={$form.race} />
        <SelectClass classes={classes} errors={errors} form={form} />
        <Button onclick={(event) => goBack(event)}>Back</Button>
        <Button type='submit'>Save</Button>
    {/if}

</form>     