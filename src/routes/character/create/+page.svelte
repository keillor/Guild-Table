<script>
    import Button from "@/components/ui/button/button.svelte";
	import Input from "@/components/ui/input/input.svelte";
	import Label from "@/components/ui/label/label.svelte";
    import { superForm } from "sveltekit-superforms";
    import SuperDebug from "sveltekit-superforms";
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
<SuperDebug data={$form}/>