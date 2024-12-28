<script>
    import Label from "@/components/ui/label/label.svelte";
    import Input from "@/components/ui/input/input.svelte";
    const {questions, form, errors} = $props();
</script>


{#each questions as question, i}
    <Label>{question.label}</Label>
    <Input type={question['type']} name={question['var']} placeholder={question['var']} class='max-w-xs' invalid={$errors.email ? 'true' : undefined} bind:value={$form[question['var']]}/>
    {#if $errors[question['var']]}<Label class="text-red-500">{$errors[question['var']]}</Label>{/if}
{/each}