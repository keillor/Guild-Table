<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Table from "$lib/components/ui/table";

  let { character, allCharacters, campaign, socket } = $props();
  let changeHealthNum = $state();

  // Function to adjust health for the player's character
  function adjustHealth(amount) {
    const targetChar = campaign.characterIds.find((char) => char.characterId === character._id);
    if (targetChar) {
      targetChar.hp += amount;
      socket.healthChange(character._id, targetChar.hp);
    }
  }
</script>

<Label>Health</Label>
<Separator class="my-4" />
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Adjust</Table.Head>
      <Table.Head>Current</Table.Head>
      <Table.Head>Max</Table.Head>
      <Table.Head>Temp</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each campaign.characterIds as char}
      <Table.Row>
        <Table.Cell>
          {#if allCharacters.find((c) => c._id === char.characterId)?.name}
            {allCharacters.find((c) => c._id === char.characterId)?.name}
          {:else}
            Unknown
          {/if}
        </Table.Cell>
        <Table.Cell>{char.hp}</Table.Cell>
        <Table.Cell>
          {#if char.characterId === character._id}
            <form>
              <Input type="number" bind:value={changeHealthNum} placeholder="HP (-/+)" class="w-24" />
              <Button type="submit" onclick={() => adjustHealth(changeHealthNum)} class="w-24">Update</Button>
            </form>
          {:else}
            <span>N/A</span>
          {/if}
        </Table.Cell>
        <Table.Cell>
          {allCharacters.find((c) => c._id === char.characterId)?.maxHp || "N/A"}
        </Table.Cell>
        <Table.Cell>{char.tempHp || 0}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>