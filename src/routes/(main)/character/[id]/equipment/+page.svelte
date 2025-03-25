<script lang="ts">
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import { enhance } from '$app/forms';
  import { SvelteSet } from 'svelte/reactivity';
  import Button from '$lib/components/ui/button/button.svelte';
	import CharacterLinks from '$lib/components/view/characterLinks.svelte';

  const { data } = $props();
  const character = data.character;

  let selectedItems = new SvelteSet();
  let totalWeight = $state(0);

  const toggleItem = (item) => {
    if (selectedItems.has(item)) {
      selectedItems.delete(item);
    } else {
      selectedItems.add(item);
    }
    calculateTotalWeight();
  };

  const calculateTotalWeight = () => {
    totalWeight = Array.from(selectedItems).reduce((sum, item) => sum + (item.weight || 0), 0);
  };
</script>

<form method="POST" use:enhance>
  <div class="p-4 rounded-lg">
    <h2 class="text-xl font-bold mb-4">Select Equipment</h2>
    <table class="table-auto w-full mb-4 border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border border-gray-300 px-4 py-2">Select</th>
          <th class="border border-gray-300 px-4 py-2">Name</th>
          <th class="border border-gray-300 px-4 py-2">Weight</th>
          <th class="border border-gray-300 px-4 py-2">Cost</th>
        </tr>
      </thead>
      <tbody>
        {#each character.equipment as equipment}
          <tr>
            <td class="border border-gray-300 px-4 py-2">
              <input
                type="checkbox"
                name="equipment"
                value={equipment.index}
                onchange={() => toggleItem(equipment)}
              />
            </td>
            <td class="border border-gray-300 px-4 py-2">{equipment.name}</td>
            <td class="border border-gray-300 px-4 py-2">{equipment.weight}</td>
            <td class="border border-gray-300 px-4 py-2">
              {equipment.cost.quantity} {equipment.cost.unit}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Button>Submit</Button>
  </div>
</form>


<div>
  <h2 class="text-xl font-bold mb-4">Equipped Items</h2>
  <ul class="mb-4">
    {#each Array.from(selectedItems) as item}
      <li>{item.name}</li>
    {/each}
  </ul>
  <p class="font-bold">Total Weight: {totalWeight}</p>
</div>

<CharacterLinks id={character._id}/>
