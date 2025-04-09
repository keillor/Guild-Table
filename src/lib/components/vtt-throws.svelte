<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import * as Table from "$lib/components/ui/table";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";

  let { character, abilityRoll } = $props()

  // Ability Scores as Placeholders
  let as_bonuses = $state(character.as_bonus_mod);

  function roll(ability, bonus) {
    let total = abilityRoll(ability, bonus, "Save");
  }
</script>

<Label class="block">Saving Throws</Label>
<Separator class="my-4" />
<Table.Root>
  <Table.Header>
   <Table.Row>
    <Table.Head>Prof</Table.Head>
    <Table.Head>Ability</Table.Head>
    <Table.Head>Bonus</Table.Head>
   </Table.Row>
  </Table.Header>
  <Table.Body>
      {#each Object.entries(as_bonuses) as [key, value]}
        <Table.Row>
          {#if character.saving_throws.includes(key)}
            <Table.Cell>
              <Checkbox id="saving-throw-cb-{key}" checked disabled/>
            </Table.Cell>
            <Table.Cell>{key}</Table.Cell>
            <Table.Cell>
              <Button
              class="{buttonVariants({ variant: 'outline' })} text-foreground"
              onclick={() => roll(key, value)}>{value + character.proficiency_bonus}</Button>
            </Table.Cell>
          {:else}
            <Table.Cell>
              <Checkbox id="saving-throw-cb-{key}" disabled/>
            </Table.Cell>
            <Table.Cell><Label>{key}</Label></Table.Cell>
            <Table.Cell>
              <Button
              class="{buttonVariants({ variant: 'outline' })} text-foreground"
              onclick={() => roll(key, value)}>{value}</Button>
            </Table.Cell>
          {/if}
        </Table.Row>
      {/each}
  </Table.Body>
 </Table.Root>

