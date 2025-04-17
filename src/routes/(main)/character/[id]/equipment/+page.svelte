<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
	import CharacterLinks from '$lib/components/view/characterLinks.svelte';
	import { Info, Minus, Plus, Trash } from 'lucide-svelte';
	import type { Equipment } from '$lib/models/character';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { equipmentSchema } from './schema.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Select from "$lib/components/ui/select/index.js";
	import { dnd5ApiEquipmentQuery } from '$lib/api/dnd5api_client.js';
	import EquipmentAsyncPopover from '$lib/components/view/EquipmentAsyncPopover.svelte';
	import { toast } from 'svelte-sonner';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';

  const { data } = $props();
  const character = data.character;
  const allEquipment = data.allEquipment.results;
  console.log(allEquipment)
  let equipment : Equipment[] = character.equipment;
  const form = superForm(defaults({'equipment': equipment}, zodClient(equipmentSchema)), {
    validators: zodClient(equipmentSchema),
    dataType: 'json',
    resetForm: false,
    onError: ({result}) => {
      console.log(result);
      toast.error('Equipment save failed.')
    },
    onUpdated: ({form: f}) => {
      if(f.valid) {
        toast.success('Equipment saved!');
      }
    }
  });
  
  const { form: formData, enhance, restore } = form;

  let totalWeight = $derived.by(() => {
    return $formData.equipment.reduce((accumulator, currentVal) => accumulator + (currentVal.weight)*(currentVal.count), 0)
  })

  const removeItem = (item: Equipment) => {
    $formData.equipment = $formData.equipment.filter((o) => o.index !== item.index);
  }

  const increment = (index: number) => {
    $formData.equipment[index].count += 1;
  }

  const decrement = (index: number) => {
    $formData.equipment[index].count -= 1;
  }

  async function addEquipment(item) {
		try {
			// Fetch additional details for the selected equipment
			const details = await dnd5ApiEquipmentQuery(item.index);
			$formData.equipment = [
				...$formData.equipment,
				{
					name: details.name,
					index: details.index,
					weight: details.weight || 0,
					cost: details.cost || { quantity: 0, unit: 'gp' },
					count: 1
				}
			];
		} catch (error) {
			console.error(error);
		}
	}

</script>

{#if character.equipment.length == 0}
<h1>{character.name} doesn't have any equipment yet! Please go to <a href='/character/{character._id}'>character edit</a> to equip items</h1>
{:else}
  <div class="p-4 rounded-lg">
    <h2 class="text-xl font-bold mb-4">Select Equipment</h2>
    <table class="table-auto w-full mb-4 border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border border-gray-300 px-4 py-2">Active</th>
          <th class="border border-gray-300 px-4 py-2">Name</th>
          <th class='border border-gray-300 px-4 py-2'>Count</th>
          <th class="border border-gray-300 px-4 py-2">Weight</th>
          <th class="border border-gray-300 px-4 py-2">Cost</th>
          <th class="border border-gray-300 px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each $formData.equipment as item, index}
          <tr>
            <td class="border border-gray-300 px-4 py-2">
              <input
                type="checkbox"
                name="item"
                value={item.index}
              />
            </td>
            <td class="border border-gray-300 px-4 py-2">{item.name}</td>
            <td class="border border-gray-300 px-4 py-2 flex flex-row">
              <Input class='w-min' min=0 value={$formData.equipment[index].count} />
              <Button class={buttonVariants({variant: 'outline'})} onclick={() => decrement(index)}><Minus class='size-4 text-black'/></Button>
              <Button class={buttonVariants({variant: 'outline'})} onclick={() => increment(index)}><Plus class='size-4 text-black'/></Button>
            </td>
            <td class="border border-gray-300 px-4 py-2">{item.weight}</td>
            <td class="border border-gray-300 px-4 py-2">
              {item.cost.quantity} {item.cost.unit}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              <Button variant='outline' onclick={() => removeItem(item)}>
                <Trash class="size-4" />
              </Button>
              <EquipmentAsyncPopover equipment={item.index}>
								<Info class="size-4" />
							</EquipmentAsyncPopover>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="mb-4">
      <Label for="equipment" >Add Equipment</Label>
      <Select.Root type="single" name="equipment" onValueChange={(i) => addEquipment(i)}>
        <Select.Trigger>
          Click here to add an item.
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.GroupHeading>Equipment</Select.GroupHeading>
            {#each allEquipment as item (item.index)}
              <Select.Item value={item} label={item.name} />
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>

    <p class="font-bold">Total Weight: {totalWeight}</p>
    <form method='POST' use:enhance>
      <Button type='submit'>Save</Button>
    </form>
  </div>
{/if}
<CharacterLinks id={character._id}/>
