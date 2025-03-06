<script lang='ts'>
	import { Badge } from "$lib/components/ui/badge/index.js";
    const { list, key } = $props();
</script>

<div class='flex flex-row gap-1'>
    {#each list as item}
        <Badge class='flex h-min flex-row content-between gap-1 text-white'>{item}</Badge>
    {/each}
</div>