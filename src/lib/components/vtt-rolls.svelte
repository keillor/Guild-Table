<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Table from "$lib/components/ui/table";
  import { Toaster } from "$lib/components/ui/sonner";
  import { toast } from "svelte-sonner";
  import { Button } from '$lib/components/ui/button/index.js';
	import { Root } from './ui/alert-dialog';
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  let character = $props()

  let user = $state({
    name: "Player Name"
  })

  let numRolls = $state(1);

  const diceNum = [
    { name: 'D4', num: 4 },
    { name: 'D6', num: 6 },
    { name: 'D8', num: 8 },
    { name: 'D10', num: 10 },
    { name: 'D12', num: 12 },
    { name: 'D20', num: 20 }
  ]

  function addDiceRoll() {
    numRolls += 1;
  }

  function removeDiceRoll() {
    if (numRolls > 1) {
      numRolls -= 1;
    }
  }

  function rollDice(num, rolls) {
    let rollTotal = 0;
    let diceRolls = []

    for (let i = 0; i < rolls; i++) {
      diceRolls[i] = Math.floor(Math.random() * num) + 1;
      rollTotal += diceRolls[i];
    }

    toast(`${user.name} rolled ${rolls} rolls of D${num}: `, {
      description: diceRolls.join(' + ') + ` = ${rollTotal}`,
    }
    );
    return rollTotal;
  } 
</script>
  
<Label class="block">Dice Rolls</Label>
<Separator class="my-4" />
<Tabs.Root value="rolls" class="left-0 top-0 p-4 ">
<Tabs.List class="flex space-x-2 border-b border-gray-200 dark:border-gray-700" aria-label="Dice Rolls">
  {#each diceNum as die}
    <Tabs.Trigger value="dice-{die.num}">{die.name}</Tabs.Trigger>
  {/each}
</Tabs.List>
  {#each diceNum as die}
    <Tabs.Content value="dice-{die.num}">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Adjust Amount</Table.Head>
            <Table.Head>Roll Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Button onclick={() => addDiceRoll()}>+</Button>
              <Button onclick={() => removeDiceRoll()}>-</Button>
            </Table.Cell>
            <Table.Cell>{numRolls}</Table.Cell>
            <Table.Cell>
              <Button onclick={() => rollDice(die.num, numRolls)}>Roll</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Tabs.Content>
  {/each}
</Tabs.Root>