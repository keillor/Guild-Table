<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Label } from "$lib/components/ui/label/index.js";


  let { character, abilityRoll } = $props()

  function roll(ability, bonus) {
    let result = abilityRoll(ability, bonus, "Check");
  }
</script>

<Label class="block">Skills</Label>
<Separator class="my-4" />
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Prof</Table.Head>
      <Table.Head>Mod</Table.Head>
      <Table.Head>Skill</Table.Head>
      <Table.Head>Bonus</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each character.proficiences as skill}
      <Table.Row>
        <Table.Cell>INV001</Table.Cell>
        <Table.Cell>Paid</Table.Cell>
        <Table.Cell>Credit Card</Table.Cell>
        <Table.Cell>$250.00</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>