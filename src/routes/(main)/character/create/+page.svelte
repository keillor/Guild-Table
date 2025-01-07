<script>
    import { superForm } from "sveltekit-superforms";
    import * as Select from "$lib/components/ui/select/index.js";
	import Button from "@/components/ui/button/button.svelte";
    let {data} = $props();
    const results = data.results;
    let value = $state("");
    const triggerContent = $derived(
        results.results.find((f) => f.index === value)?.name ?? "Select a Race..."
    );
    const {form, errors, message, enhance} = superForm(data.form);
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Create a Character
</h1>

{#if $message}<h3 class="text-green-500">{$message}</h3>{/if}

<form method='POST' action='/test'>
    <!-- <FormForEach {form} {questions} {errors}/> -->
     
    <Select.Root type="single" name="favoriteFruit" bind:value>
        <Select.Trigger class="w-[180px]">
            {triggerContent}
        </Select.Trigger>
        <Select.Content>
            <Select.Group>
            {#each results.results as race}
                <Select.Item value={race.index} label={race.name}>{race.name}</Select.Item>
            {/each}
            </Select.Group>
        </Select.Content>
    </Select.Root>
    <Button type='submit'>Next</Button>

</form>