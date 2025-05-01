<script lang='ts'>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import {Button, buttonVariants} from "$lib/components/ui/button/index.js";
  import { Backpack, Dices, Heart, ScrollText, BookOpen, Sparkles, Swords, UserRound, Skull, DoorOpen, ClockArrowUp, Map } from "lucide-svelte";
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
  import VTTMap from "$lib/components/vtt-map.svelte";
  import CampaignMap from "./campaign-map/+page.svelte";
  import { GuildSocket } from '$lib/socket/SocketIOTools.js';
	import VttTurntracker from '$lib/components/vtt-turntracker.svelte';

  const { data } = $props();
  const access_token = data.session?.access_token
  const campaign = $state(data.campaign);
  const user = data.user;
  let mapURL = $state(`https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//${campaign.mapIds[1].id}`)

    // http://localhost:5173/socket/6802904e5750fa22e6ac3d33
    // http://localhost:5001/socket/6802904e5750fa22e6ac3d33
  const socket = new GuildSocket('https://sockets.98.148.238.215.sslip.io', access_token, page.params.id);
  socket.on('healthChange', ({characterID, newHealth}) => {
    const targetChar = campaign.characterIds.find((char) => char.characterId === characterID);
    if (targetChar) {
      targetChar.hp = newHealth;
    }
  })


  const monsters = data.monsters;
  let monsterContainer = $state([]);

  let allCharacters = $state(data.characters); // Array of other characters
  let character = $state(allCharacters.find((char) => char.user === data.user.id)); // User's own character

  if (allCharacters.find((char) => char.user === data.user.id)) {
    character = allCharacters.find((char) => char.user === data.user.id);
  } else {
    character = allCharacters[0];
  }


  console.log('Campaign:', campaign);

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
    },
    {
      title: 'turn-tracker',
      icon: ClockArrowUp,
      component: VttTurntracker
    },
    {
      title: "map",
      icon: Map,
      component: VTTMap
    }
  ];

  // Roll D20 with ability bonus
  function abilityRoll(ability, bonus, rollType) {
    socket.abilityRoll(ability, bonus, rollType);
  }

  function rollNumberedDice(num, rolls) {
    socket.rollNumberedDice(num, rolls);
  }

  function changeMap(mapID) {
    console.log('Changing Map to:', mapID);
    socket.changeMap(mapID);
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

  // Socket Event Listeners
  socket.on('addMonster', (monsterID) => {
    const monster = monsters.find((monster) => monster._id == monsterID);
    monsterContainer = [...monsterContainer, monster];
    console.log('Monster Added to Container:', monsterContainer);
  });

  socket.on('rollNumberedDice', (num, rolls) => {
    let rollTotal = 0;
    let diceRolls = []

    for (let i = 0; i < rolls; i++) {
      diceRolls[i] = Math.floor(Math.random() * num) + 1;
      rollTotal += diceRolls[i];
    }

    toast(`${character.name} rolled ${rolls} rolls of D${num}: `, {
      description: diceRolls.join(' + ') + ` = ${rollTotal}`,
    }
    );
    return rollTotal;
  })

  socket.on('abilityRoll', (ability, bonus, rollType) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + bonus;
    toast(`${ability}: ${rollType}`, {
      description: `${character.name} rolled a ${roll} + ${bonus} = ${total}`,
    });

    return total;
  })

  socket.on('changeMap', (mapID) => {
    mapURL = `https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//${mapID}`
  })
</script>

<div class="flex flex-row justify-between h-full w-full">
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
              <item.component {campaign} {character} {rollNumberedDice} {abilityRoll} {toastMain} {parseName} {monsters} {monsterContainer} {allCharacters} {socket} {user} {changeMap}/>
            </Popover.Content>
          </Popover.Root>
          {/each}
      </div>
    </Card.Content>
    <Card.Footer>
      <Button href="/homepage" class="m-0"><DoorOpen /></Button>
    </Card.Footer>
  </Card.Root>

<!-- Render game on the right side-->
  <Card.Root 
    id="game-card" 
    class="absolute left-20 right-0 w-full h-full m-5 p-0 rounded-lg shadow-lg">
    <Card.Content class="w-screen h-screen">
      <CampaignMap {character} {allCharacters} {campaign} {monsters} {socket} {mapURL}/>
    </Card.Content>
  </Card.Root>
</div>