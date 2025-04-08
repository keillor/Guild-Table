<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Table from "$lib/components/ui/table";

  let { character, toastMain } = $props();

  let characterEquipment = $state(character.equipment)
  let totalWeight = $state(0);

  function updateTotalWeight() {
    characterEquipment.forEach(item => {
      totalWeight += item.weight * item.count;
    });
  }

  updateTotalWeight();
</script>

<Label class="block">Weapons</Label>
<Separator class="my-4" />
<Label class="block">Total Weight: {totalWeight}lbs</Label>
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Equip</Table.Head>
      <Table.Head>Name</Table.Head>
      <Table.Head>Quantity</Table.Head>
      <Table.Head>Weight</Table.Head>
      <Table.Head>Cost</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each characterEquipment as item}
      <Table.Row>
        <Table.Cell><Checkbox id="cb-{item['index']}"/></Table.Cell>
        <Table.Cell>{item['name']}</Table.Cell>
        <Table.Cell>{item['count']}</Table.Cell>
        <Table.Cell>{item['weight']}</Table.Cell>
        <Table.Cell>{item['cost']['quantity']}{item['cost']['unit']}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>