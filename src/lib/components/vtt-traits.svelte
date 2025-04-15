<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Separator } from "$lib/components/ui/separator/index.js";

  let { character, toastMain, parseName } = $props();
</script>

<Label class="block">Features and Traits</Label>
<Separator class="my-4" />
<Tabs.Root value="features-and-traits">
  <Tabs.List>
    <Tabs.Trigger value="all">All</Tabs.Trigger>
    <Tabs.Trigger value="class-features">Class Features</Tabs.Trigger>
    <Tabs.Trigger value="species-traits">Species Traits</Tabs.Trigger>
    <Tabs.Trigger value="feats">Feats</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="class-features">
    <br />
    <Label class="block">{parseName(character['class'])} Class Features</Label>
    <Separator class="my-4" />
    <Label>Core {parseName(character['class'])} Features</Label>
    <ul>
      {#each character['features'] as feature}
      <li>{parseName(feature)}</li>
      {/each}
    </ul>
  </Tabs.Content>
  <Tabs.Content value="species-traits">
    <br />
    <Label class="block">Species Traits</Label>
    <Separator class="my-4" />
    <Label>Creature Type</Label>
    <p>You are a {character.race}. {character.alignment}</p>
    <br/>
    {#if character.subrace}
      <Label>Subrace</Label>
      <p>You are a {character.subrace}</p>
    {/if}
    <Label>Size</Label>
    <p>{character.size_description}</p>
    <br/>
    <Label>Speed</Label>
    <p>Your speed is {character.speed}</p>
    {#each character.traits as trait}
      <br/>
      <Label>{parseName(trait)}</Label>
      <p>You have the {trait} trait</p>
    {/each}
  </Tabs.Content>
</Tabs.Root>