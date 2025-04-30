<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { monsterAvatar } from '$lib/utilities/character/monster.ts';

  let { monsters, monsterContainer, socket } = $props();

  function addMonster(monsterID) {
    console.log('Adding monster:', monsterID);
    socket.addMonster(monsterID);
  }

  function removeMonster(monsterID) {
    console.log('Removing monster:', monsterID);
  }

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
        <Table.Cell>
          <Avatar.Root class="size-10">
            <Avatar.Image
              src={monsterAvatar(monster.image)}
              alt={monster.name}
            />
            <Avatar.Fallback>{monster.name[0]}</Avatar.Fallback>
          </Avatar.Root>
        </Table.Cell>
        <Table.Cell>{monster.name}</Table.Cell>
        <Table.Cell>numMonsters</Table.Cell>
        <Table.Cell>
          <Button variant="outline" onclick={() => addMonster(monster._id)}>+</Button>
          <Button variant="outline" onclick={() => removeMonster(monster._id)}>-</Button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
