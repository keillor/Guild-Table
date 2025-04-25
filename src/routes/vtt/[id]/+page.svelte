<script lang='ts'>
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import {Button, buttonVariants} from "$lib/components/ui/button/index.js";
  import { Backpack, Dices, Heart, ScrollText, BookOpen, Sparkles, Swords, UserRound, Skull, DoorOpen } from "lucide-svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import { toast } from "svelte-sonner";
  import VTTRolls from "$lib/components/vtt-rolls.svelte";
  import VTTCharacter from "$lib/components/vtt-character.svelte";
  import VTTSkills from "$lib/components/vtt-skills.svelte";
  import VTTThrows from "$lib/components/vtt-throws.svelte";
  import VTTHealth from "$lib/components/vtt-health.svelte";
  import VTTWeapons from "$lib/components/vtt-weapons.svelte";
  import VTTTraits from "$lib/components/vtt-traits.svelte";
  import VTTInventory from "$lib/components/vtt-inventory.svelte";
  import VTTMonster from "$lib/components/vtt-monster.svelte";
  import CampaignMap from "./campaign-map/+page.svelte";

  const { data } = $props();
  console.log(data.characters[0])

  let character = $state(data.characters[0]);

  const items = [
    {
      title: "rolls",
      icon: Dices,
      component: VTTRolls
    },
    { title: "character-attributes",
      icon: UserRound,
      component: VTTCharacter
    },
    {
      title: "character-skills",
      icon: BookOpen,
      component: VTTSkills
    },
    {
      title: "saving-throws",
      icon: Sparkles,
      component: VTTThrows
    },
    { 
      title: "health", 
      icon: Heart,
      component: VTTHealth
    },
    {
      title: "weapons",
      icon: Swords,
      component: VTTWeapons
    },
    {
      title: "features-and-traits",
      icon: ScrollText,
      component: VTTTraits
    },
    {
      title: "inventory",
      icon: Backpack,
      component: VTTInventory
    },
    {
      title: "monster-management",
      icon: Skull,
      component: VTTMonster
    }
  ];

  // Roll D20 with ability bonus
  function rollTwenty(ability, bonus, rollType) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + bonus;
    toast(`${ability}: ${rollType}`, {
      description: `You rolled a ${roll} + ${bonus} = ${total}`,
    });

    return total;
  }

  function toastMain(header: string, description: string) {
    toast(header, {
      description: description
    })
  }

  function parseName(name: string) {
    return name
      .replace(/-/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, c => c.toUpperCase());
  }
</script>

<div class="flex flex-row h-full w-full">
  <Card.Root 
  id="button-container-card" 
  class="absolute left-0 w-20 h-full m-5 p-0 rounded-lg shadow-lg">
    <Card.Content>
      <div id="button-container" class="flex flex-col items-center gap-2">
        {#each items as item}
          <Popover.Root>
            <Popover.Trigger 
              class="${buttonVariants({ variant: 'outline' })}"
              >
                <item.icon class='size-6'/>
            </Popover.Trigger>
            <Popover.Content side='right'>
              <item.component {character} abilityRoll={rollTwenty} {toastMain} {parseName}/>
            </Popover.Content>
          </Popover.Root>
          {/each}
      </div>
    </Card.Content>
    <Card.Footer>
      <Button href="/homepage"><DoorOpen /></Button>
    </Card.Footer>
  </Card.Root>

<!-- Render game on the right side-->
  <Card.Root 
    id="game-card" 
    class="absolute left-20 right-0 w-full h-full m-5 p-0 rounded-lg shadow-lg">
    <Card.Content class="w-screen h-screen">
      <CampaignMap {character}/>
      <Toaster position="bottom-right" />
    </Card.Content>
  </Card.Root>
</div>