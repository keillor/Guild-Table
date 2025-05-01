<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Table from "$lib/components/ui/table";

  let { character, campaign, socket } = $props();
  let maxHealth = character.hp
  let currentHealth = $state(campaign.characterIds.find((char) => char.characterId === character._id)?.hp || character.hp);
  let temporaryHealth = $state(10);

  const healthInput = document.getElementById("healthInput");
  let changeHealthNum = $state();

  function adjustHealth(amount) {
    currentHealth += amount;
    changeHealthNum = null;

    const targetChar = campaign.characterIds.find((char) => char.characterId === character._id);
    if (targetChar) {
      targetChar.hp += amount;
    }

    socket.healthChange(character._id, currentHealth);
  }
</script>

<Label>Health</Label>
<Separator class="my-4" />
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Adjust</Table.Head>
      <Table.Head>Current</Table.Head>
      <Table.Head>Max</Table.Head>
      <Table.Head>Temp</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <form>
          <Input type="number" bind:value={changeHealthNum} placeholder="HP (-/+)" class="w-24" />
          <Button type="submit" onclick={() => adjustHealth(changeHealthNum)} class="w-24">Update</Button>
        </form>
      </Table.Cell>
      <Table.Cell>{currentHealth}</Table.Cell>
      <Table.Cell>{maxHealth}</Table.Cell>
      <Table.Cell>{temporaryHealth}</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>