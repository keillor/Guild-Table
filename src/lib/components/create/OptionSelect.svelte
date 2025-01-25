<script>
    const {options} = $props();
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import Label from "@/components/ui/label/label.svelte";
</script>


{#each options as option (option.index)}
    <Checkbox name={option.index}/>
    <Label 
{/each}
