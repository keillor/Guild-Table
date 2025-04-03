<script>
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
	import { Root } from './ui/alert-dialog';

  $: numRolls = 1;

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

  function rollDice(num) {
    // Generate a random number between 1 and num (inclusive)
    return Math.floor(Math.random() * num) + 1;
  }
</script>
  
 <Tabs.Root value="rolls" class="">
  <Tabs.List>
    {#each diceNum as die}
      <Tabs.Trigger value="dice-{die.num}">{die.name}</Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each diceNum as die}
    <Tabs.Content value="dice-{die.num}">
      <div class="button-container">
        <Button on:click={() => addDiceRoll()}>+</Button>
        <Button on:click={() => removeDiceRoll()}>-</Button>
      </div>
      <h1>
        {numRolls}
      </h1>
      <Button on:click={() => rollDice(numRolls)}>Roll</Button>
    </Tabs.Content>
  {/each}
 </Tabs.Root>