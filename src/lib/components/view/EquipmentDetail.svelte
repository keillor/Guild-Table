<script>
    const {equipment} = $props();
  </script>
  
  <div class="rounded-lg">
    <h2 class="text-2xl font-bold mb-2">{equipment.name}</h2>
    <p class="text-sm">Category: {equipment.equipment_category.name}</p>
  
    {#if equipment.desc && equipment.desc.length > 0}
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Description</h3>
        {#each equipment.desc as line}
          <p class="text-sm">{line}</p>
        {/each}
      </div>
    {/if}
  
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Details</h3>
      {#if equipment.weight !== undefined}
        <p class="text-sm">Weight: {equipment.weight} lbs</p>
      {/if}
      <p class="text-sm">Cost: {equipment.cost.quantity} {equipment.cost.unit}</p>
  
      {#if equipment.armor_category  !== undefined}
        <p class="text-sm">Armor Category: {equipment.armor_category}</p>
      {/if}
  
      {#if equipment.armor_class !== undefined}
        <p class="text-sm">Armor Class: {equipment.armor_class.base}</p>
        {#if equipment.armor_class.dex_bonus}
          <p class="text-sm">Dex Bonus: Yes</p>
        {/if}
        {#if equipment.armor_class.max_bonus !== null}
          <p class="text-sm">Max Bonus: {equipment.armor_class.max_bonus}</p>
        {/if}
      {/if}
  
      {#if equipment.damage !== undefined}
        <p class="text-sm">Damage: {equipment.damage.damage_dice} ({equipment.damage.damage_type.name})</p>
      {/if}
  
      {#if equipment.range !== undefined}
        <p class="text-sm">Range: {equipment.range.normal} ft{equipment.range.long ? ` / ${equipment.range.long} ft` : ''}</p>
      {/if}
  
      {#if equipment.str_minimum !== undefined}
        <p class="text-sm">Strength Minimum: {equipment.str_minimum}</p>
      {/if}
  
      {#if equipment.stealth_disadvantage !== undefined}
        <p class="text-sm">Stealth Disadvantage: Yes</p>
      {/if}
  
      {#if equipment.two_handed_damage !== undefined}
        <p class="text-sm">Two-Handed Damage: {equipment.two_handed_damage.damage_dice} ({equipment.two_handed_damage.damage_type.name})</p>
      {/if}
  
      {#if equipment.properties && equipment.properties.length > 0 }
        <p class="text-sm">Properties: {equipment.properties.map(p => p.name).join(', ')}</p>
      {/if}
  
      {#if equipment.special && equipment.special.length > 0}
        <div class="mt-4">
          <h3 class="text-lg font-semibold">Special Features</h3>
          {#each equipment.special as feature}
            <p class="text-sm">{feature}</p>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  