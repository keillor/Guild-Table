<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import {Button, buttonVariants} from "$lib/components/ui/button/index.js";
  import { Backpack, Dices, Heart, ScrollText, Sparkles, Swords, UserRound } from "lucide-svelte";

  const items = [
    {
      title: "rolls",
      icon: Dices
    },
    { title: "character-attributes",
      icon: UserRound
    },
    {
      title: "other-information",
      icon: Sparkles
    },
    {
      title: "saving-throws",
      icon: Sparkles
    },
    { 
      title: "health", 
      icon: Heart
    },
    {
      title: "weapons",
      icon: Swords
    },
    {
      title: "features-and-traits",
      icon: ScrollText
    },
    {
      title: "inventory",
      icon: Backpack
    }
  ]
</script>

<Card.Root class="absolute left-0 w-20 h-full m-0 p-0">
  <Card.Content>
    <div id="button-container" class="flex flex-col items-center space-y-5">
      {#each items as item}
        <Popover.Root>
          <Popover.Trigger class="${buttonVariants({ variant: 'outline' })} flex items-center mx-0 p-2 m-1">
              <item.icon class="w-7 h-10" />
          </Popover.Trigger>
          <Popover.Content><h1>Popover: {item.title}</h1></Popover.Content>
        </Popover.Root>
      {/each}
    </div>
  </Card.Content>
  <Card.Footer>
    <Button href="/homepage">Home</Button>
  </Card.Footer>
</Card.Root>
