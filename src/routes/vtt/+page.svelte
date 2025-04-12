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

  const character = $state({
    _id: '67e4546a0ea8d52aee4e23dd',
    name: 'Indiana Bones',
    race: 'half-elf',
    subrace: '',
    'class': 'monk',
    speed: '30',
    alignment: 'Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules, resent others\' demands, and sometimes prove unreliable, or at least unpredictable.',
    age: '360',
    size: 'Medium',
    size_description: 'Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.',
    language_desc: 'You can speak, read, and write Common, Elvish, and one extra language of your choice.',
    spellcasting_ability: '',
    level: 1,
    proficiency_bonus: 2,
    hit_die: 8,
    as_bonus: 0,
    spellcasting_level: 0,
    as_bonus_mod: {
        cha: 2,
        con: 0,
        dex: 0,
        'int': 0,
        wis: 0,
        str: 0
    },
    proficiencies: [
        'simple-weapons',
        'shortswords',
        'saving-throw-dex',
        'saving-throw-str',
        'skill-athletics',
        'skill-religion',
        'jewelers-tools'
    ],
    languages: [
        'common',
        'elvish'
    ],
    traits: [
        'darkvision',
        'fey-ancestry',
        'skill-versatility'
    ],
    features: [
        'monk-unarmored-defense',
        'martial-arts'
    ],
    saving_throws: [
        'str',
        'dex'
    ],
    spells: {},
    equipment: [
        {
            name: 'Mess Kit',
            index: 'mess-kit',
            count: 0,
            weight: 1,
            cost: {
                quantity: 2,
                unit: 'sp'
            }
        },
        {
            name: 'Amulet',
            index: 'amulet',
            count: 1,
            weight: 1,
            cost: {
                quantity: 5,
                unit: 'gp'
            }
        },
        {
            name: 'Backpack',
            index: 'backpack',
            count: 1,
            weight: 5,
            cost: {
                quantity: 2,
                unit: 'gp'
            }
        },
        {
            name: 'Antitoxin (vial)',
            index: 'antitoxin-vial',
            count: 1,
            weight: 0,
            cost: {
                quantity: 50,
                unit: 'gp'
            }
        },
        {
            name: 'Blowgun',
            index: 'blowgun',
            count: 1,
            weight: 1,
            cost: {
                quantity: 10,
                unit: 'gp'
            }
        },
        {
            name: 'Chest',
            index: 'chest',
            count: 1,
            weight: 25,
            cost: {
                quantity: 5,
                unit: 'gp'
            }
        }
    ],
    user: '909e8622-f42e-490e-89f0-e37f5135332b',
    ability_scores: {
        cha: 24,
        con: 22,
        dex: 20,
        'int': 18,
        str: 16,
        wis: 14
    }
})

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
    <CampaignMap/>
    <Toaster position="bottom-right" />
  </Card.Content>
</Card.Root>