<script>
    import { superForm } from "sveltekit-superforms";
    import * as Select from "$lib/components/ui/select/index.js";
    let {data} = $props();
    const results = data.results;
    let value = $state("");

    const triggerContent = $derived(
        fruits.find((f) => f.value === value)?.label ?? "Select a fruit"
    );

    const {form, errors, message} = superForm(data.form);
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Create a Character
</h1>

{#if $message}<h3 class="text-green-500">{$message}</h3>{/if}

<form method='POST'>
    <!-- <FormForEach {form} {questions} {errors}/> -->
    <input type='submit'/>
</form>