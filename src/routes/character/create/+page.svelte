<script>
    import { superForm } from "sveltekit-superforms";
    import {questions} from "./questions.json";
    import FormForEach from "@/helpers/form_helpers/FormForEach.svelte";
    let {data} = $props();

    const {form, errors, message} = superForm(data.form);

    console.log(questions)
    
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Create a Character
</h1>

{#if $message}<h3 class="text-green-500">{$message}</h3>{/if}

<form method='POST'>
    <FormForEach {form} {questions} {errors}/>
    <input type='submit'/>
</form>