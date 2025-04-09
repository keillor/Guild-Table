<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Table from "$lib/components/ui/table";

  let { character, toastMain } = $props();
  let maxHealth = $state(15);
  let currentHealth = $state(maxHealth);
  let temporaryHealth = $state(10);

  const healthInput = document.getElementById("healthInput");
  let changeHealthNum = $state();

  function adjustHealth(amount) {
    if (amount < 0 && temporaryHealth > 0) {
      if (temporaryHealth < amount) {
        amount = amount + temporaryHealth;
        temporaryHealth = 0;
      } else {
        temporaryHealth = Math.max(temporaryHealth + amount, 0);
        amount = 0;
      }
    } else

    if (amount > 0) {
      currentHealth = Math.min(currentHealth + amount, maxHealth);
    } else {
      currentHealth = Math.max(currentHealth + amount, 0);
    }
    changeHealthNum = 0;
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
          <Input type="number" bind:value={changeHealthNum} placeholder="Enter Health Amount (-/+)" class="w-24" />
          <Button type="submit" onclick={() => adjustHealth(changeHealthNum)} class="w-24">Change Health</Button>
        </form>
      </Table.Cell>
      <Table.Cell>{currentHealth}</Table.Cell>
      <Table.Cell>{maxHealth}</Table.Cell>
      <Table.Cell>{temporaryHealth}</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>