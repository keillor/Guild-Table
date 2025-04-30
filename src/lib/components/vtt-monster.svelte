<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";

  let { monsters, monsterContainer } = $props();

</script>

<Label>Monster Management</Label>
<Separator class="my-4" />
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head></Table.Head>
      <Table.Head>Name</Table.Head>
      <Table.Head>Qty.</Table.Head>
      <Table.Head>Adjust</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each monsters as monster}
      <Table.Row>
        <Table.Cell><img src={monster.image} alt={monster.name}/></Table.Cell>
        <Table.Cell>{monster.name}</Table.Cell>
        <Table.Cell>numMonsters</Table.Cell>
        <Table.Cell><Button variant="outline">+</Button><Button variant="outline">-</Button></Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
