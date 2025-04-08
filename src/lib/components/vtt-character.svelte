<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Table from "$lib/components/ui/table";
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Toaster } from "$lib/components/ui/sonner";
  import { toast } from "svelte-sonner";
	import { Root } from './ui/alert-dialog';


  let { character, abilityRoll } = $props()

  let ability_scores = $state(character.ability_scores);
  let as_bonus_mod = $state(character.as_bonus_mod);

  function roll(ability, bonus) {
    let result = abilityRoll(ability, bonus, "Check");
  }
  
</script>

<Label class="block">Ability Scores</Label>
<Separator class="my-4" />
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Ability</Table.Head>
      <Table.Head>Score</Table.Head>
      <Table.Head>Bonus</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each Object.entries(ability_scores) as [key, value]}
      <Table.Row>
        <Table.Cell><Label>{key}</Label></Table.Cell>
        <Table.Cell>{value}</Table.Cell>
        <Table.Cell>
          <Button class="{buttonVariants({ variant: 'outline' })} text-foreground" onclick={() => roll(key, as_bonus_mod[key])}>{as_bonus_mod[key]}</Button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>