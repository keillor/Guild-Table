<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Table from "$lib/components/ui/table";
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
	import { onMount } from "svelte";

  let { allMonsters } = $props();

  // Example function for button action
  function handleButtonClick(monsterId: string) {
    console.log(`Button clicked for monster with ID: ${monsterId}`);
  }

  onMount(() => {
		allMonsters.forEach((monst) => {
			if (!monst.visible) {
				monst.visible = false;
			}
		});
	});
</script>

<Label>Monster Management</Label>
<Separator class="my-4" />

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Visible</Table.Head>
      <Table.Head>Name</Table.Head>
      <Table.Head>Action</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each allMonsters as monster}
      <Table.Row>
        <Table.Cell>
          <Checkbox bind:checked={monster.visibleToPlayer} />
        </Table.Cell>
        <Table.Cell>{monster.name}</Table.Cell>
        <Table.Cell>
          <Button variant="outline" onclick={() => handleButtonClick(monster._id)}>
            Action
          </Button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>