<script lang='ts'>
	import { Badge } from "$lib/components/ui/badge/index.js";
    const { formData, key } = $props();
    const removeItem = (item) => {
        //$formData[key] = $formData[key].filter((i) => i !== item);
        $formData[key] = $formData[key].filter((i) => i != item);
    }
</script>

<div class='flex flex-row gap-1'>
    {#each $formData[key] as item}
        <Badge onclick={() => removeItem(item)} class='flex h-min flex-row content-between gap-1 text-white'>{item}</Badge>
    {/each}
</div>