<script lang='ts'>

  import * as Card from "$lib/components/ui/card/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import {Button, buttonVariants} from "$lib/components/ui/button/index.js";
  import { Backpack, Dices, Heart, House, ScrollText, Sparkles, Swords, UserRound } from "lucide-svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import VttRolls from "$lib/components/vtt-rolls.svelte";

  const items = [
    {
      title: "rolls",
      icon: Dices,
      component: VttRolls
    },
    { title: "character-attributes",
      icon: UserRound,
      component: Input
    },
    {
      title: "other-information",
      icon: Sparkles,
      component: Input
    },
    {
      title: "saving-throws",
      icon: Sparkles,
      component: Input
    },
    { 
      title: "health", 
      icon: Heart,
      component: Input
    },
    {
      title: "weapons",
      icon: Swords,
      component: Input
    },
    {
      title: "features-and-traits",
      icon: ScrollText,
      component: Input
    },
    {
      title: "inventory",
      icon: Backpack,
      component: Input
    }
  ];

  let gameDivRef = $state<HTMLElement>(null!);


  
</script>

<Card.Root 
  id="button-container-card" 
  class="absolute left-0 w-20 h-full m-5 p-0 rounded-lg shadow-lg">
  <Card.Content>
    <div id="button-container" class="flex flex-col items-center gap-2">
      {#each items as item}
        <Popover.Root open={false}>
          <Popover.Trigger 
            class="${buttonVariants({ variant: 'outline' })} flex items-center mx-0 p-2 aspect-square"
            >
              <item.icon class='size-6'/>
          </Popover.Trigger>
          <Popover.Content side='right'>
            <item.component />
          </Popover.Content>
        </Popover.Root>
        {/each}
        <Button href="/homepage"><House/></Button>
    </div>
  </Card.Content>
</Card.Root>

<!-- Render game on the right side-->
<Card.Root 
  id="game-card" 
  class="absolute left-20 right-0 h-full m-5 p-0 rounded-lg shadow-lg">
  <Card.Content>
    <div bind:this={gameDivRef}>
      <p>Game</p>
    </div>
  </Card.Content>
</Card.Root>

