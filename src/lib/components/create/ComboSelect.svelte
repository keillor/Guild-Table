<script>
	import { CircleX } from "lucide-svelte";
	import { Badge } from "../ui/badge";

    import { Input } from "$lib/components/ui/input/index.js";
    import Label from "@/components/ui/label/label.svelte";

    const {formInputName, formDisplayName, form} = $props();
    const allThings = [{index: 'common', name: 'Common'}, {index: 'english', name: 'English'}, {index: 'greek', name: 'Greek'}]

</script>

<Label for={formInputName}>{formDisplayName}</Label>
<Input name={formInputName} bind:value={$form['formInputName']} type='text'/>
<div class='flex flex-row gap-2'>
    {#each $form[`${formInputName}`] as item (item.index)}
        <Badge class='flex flex-row content-between gap-1 text-white w-min' onclick={(event) => {
            event.preventDefault();
            $form.languages = $form.languages.filter((l) => l.index !== item.index);
        }}>
            {item.name}
            <CircleX />
        </Badge>
    {/each}
</div>