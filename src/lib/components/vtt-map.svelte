<script>
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let { campaign, changeMap } = $props();

  let map = campaign.mapIds

  let newMapIndex = $state(0);
  
</script>

<div class="flex flex-col justify-between w-full h-full">
    <Label class="block">Maps</Label>
    <Separator class="my-4" />
    <RadioGroup.Root class="my-4" bind:value={newMapIndex}>
      {#each map as m}
        <div class="flex items-center space-x-2">
          <RadioGroup.Item value="{map.indexOf(m)}" />
          <Label for={m._id}>{m.name}</Label>
        </div>
      {/each}
      <RadioGroup.Input name="new-map" />
    </RadioGroup.Root>
    <Button variant="outline" class="my-4" onclick={() => changeMap(map[newMapIndex].id)}>Change Map</Button>

</div>