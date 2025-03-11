<script>
  const {equipment} = $props();
</script>

<div class="p-4 rounded-lg">
  <h2 class="text-xl font-bold mb-2">{equipment.name}</h2>
  <p class="text-sm">Category: {equipment.equipment_category?.name || 'Unknown'}</p>
  {#if equipment.gear_category}
    <p class="text-sm">Gear Category: {equipment.gear_category.name}</p>
  {/if}

  <p class="text-sm">Cost: {equipment.cost?.quantity} {equipment.cost?.unit}</p>
  <p class="text-sm">Weight: {equipment.weight ?? 'Unknown'} lbs</p>

  {#if equipment.desc && equipment.desc.length > 0}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Description</h3>
      {#each equipment.desc as line}
        <p class="text-sm">{line}</p>
      {/each}
    </div>
  {/if}

  {#if equipment.special && equipment.special.length > 0}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Special</h3>
      {#each equipment.special as line}
        <p class="text-sm">{line}</p>
      {/each}
    </div>
  {/if}

  {#if equipment.contents && equipment.contents.length > 0}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Contents</h3>
      {#each equipment.contents as content}
        <p class="text-sm">{content.item.name} (x{content.quantity})</p>
      {/each}
    </div>
  {/if}

  {#if equipment.properties && equipment.properties.length > 0}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Properties</h3>
      <p class="text-sm">{equipment.properties.map(p => p.name).join(', ')}</p>
    </div>
  {/if}
</div>
