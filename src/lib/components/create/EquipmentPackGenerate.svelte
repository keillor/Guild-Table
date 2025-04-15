<script>
	import { Badge } from '../ui/badge';
    import { dnd5ApiEquipmentQuery } from '@/api/dnd5api_client';

	const { formInputName, uri, equipIndex} = $props();
    const results = dnd5ApiEquipmentQuery(uri);
</script>
{#await results}
    <p>Loading...</p>
{:then allThings}
<div class="flex flex-row gap-2">
	{#each allThings.contents as item, index}
		<Badge
			class="flex h-min flex-row content-between gap-1 text-white"
		>
			{item.item.name}
		</Badge>
		<input hidden name={`${formInputName}_${equipIndex}_${index}`} value={JSON.stringify({[item.item.index]: item.quantity})}/>
	{/each}
</div>
{:catch e}
    <p class='text-destructive font-bold'>Error! {e.message}</p>
{/await}