<script lang='ts'>
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import * as Card from '$lib/components/ui/card/index.js';
	import as_mod_calc from "$lib/utilities/character/character_calculations";
	import GenericAsyncPopover from "$lib/components/view/GenericAsyncPopover.svelte";

    const { data } = $props();
    const character = data.character;
    let equipmentList = character.equipment;
    let selectedItems = $state(new Set());
    const toggleItem = (item) => {
    if (selectedItems.has(item)) {
        selectedItems.delete(item);
    } else {
        selectedItems.add(item);
    }
    };
const submitForm = () => {
  const equippedItems = Array.from(selectedItems);
  console.log('Equipped Items:', equippedItems);
  // You can handle form submission here (e.g., POST request)
};
</script>
  
  <div class="p-4 rounded-lg">
    <h2 class="text-xl font-bold mb-4">Select Equipment</h2>
    <ul class="mb-4">
      {#each equipmentList as equipment}
        <li>
          <label>
            <input
              type="checkbox"
              onchange={() => toggleItem(equipment)}
            />
            {equipment.name}
          </label>
        </li>
      {/each}
    </ul>
  
    <button onclick={submitForm} class="px-4 py-2 border rounded">
      Submit Equipped Items
    </button>
  </div>

  <div class="p-4 rounded-lg">
    <h2 class='text-xl font-bold mb-4'>Equipted Items</h2>
    {#each selectedItems as item}
        <p>{item}</p>
    {/each}
  </div>
  