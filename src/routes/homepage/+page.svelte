<script>
// @ts-nocheck

  import * as Carousel from "$lib/components/ui/carousel/index.ts";
  import * as Card from "$lib/components/ui/card/index.js";
  import {Button} from "$lib/components/ui/button/index.js";
  import { onMount, afterUpdate } from 'svelte';

export let data;
let { session, supabase } = data;
let fetchedUser;


async function renderUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    fetchedUser = user;
  } else {
    fetchedUser = null;
  }
}

onMount (() => {
  renderUser()
})

afterUpdate (() => {
  renderUser()
})
  

  const games_info = {
    "1" : {
      "name" : "Game 1",
      "description" : "Game 1 Description",
      "image" : "https://via.placeholder.com/150"
    },
    "2" : {
      "name" : "Game 2",
      "description" : "Game 2 Description",
      "image" : "https://via.placeholder.com/150"
    },
    "3" : {
      "name" : "Game 3",
      "description" : "Game 3 Description",
      "image" : "https://via.placeholder.com/150"
    },
    "4" : {
      "name" : "Game 4",
      "description" : "Game 4 Description",
      "image" : "https://via.placeholder.com/150"
    },
    "5" : {
      "name" : "Game 5",
      "description" : "Game 5 Description",
      "image" : "https://via.placeholder.com/150"
    }
  }

  async function disableAlert() {
    const announcementAlert = document.getElementById("announcement-alert")?.addEventListener("click", function() {
      document.getElementById("announcement-alert")?.remove();
    });
  }
</script>

<div class="w-full overflow-x-hidden px-5">
  <navigation class="fixed top-0 left-0 w-full flex justify-between items-center py-4 bg-white shadow-md z-10 px-5">
    <div class="flex items-center">
      <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" alt="User Photo" class="rounded-full mr-2 w-6 h-6">
      <span>User ID: {fetchedUser?.id}</span>
    </div>
    <div class="text-center">
      <h2 class="text-xl font-bold">Guild Table</h2>
    </div>
    <div>
      <button class="fa-bars p-2 bg-gray-200 rounded"></button>
    </div>
  </navigation>
  <div class="pt-20 space-y-10">
    <div id="announcement-alert" class="w-full bg-blue-500 text-white p-5 z-20 relative">
      <Card.Root>
        <Card.Header>
          <Card.Title>Announcement Alert!</Card.Title>
          <Card.Description>January 1, 2025</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Announcement content is placed here.</p>
        </Card.Content>
        <Card.Footer>
          <Button onclick="{disableAlert()}">Dismiss</Button>
        </Card.Footer>
      </Card.Root>  
    </div>

    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Homepage</h1>

    <section>
      <h1 class="text-2xl font-bold">My Games</h1>
      <Carousel.Root
        opts={{
          align: "start"
        }}
        class="w-full mx-5 max-w-8xl"
      >
        <Carousel.Content>
          {#each Object.keys(games_info) as game_id (game_id)}
            <Carousel.Item class="md:basis-1/3 lg:basis-1/4">
              <div class="p-1">
                <Card.Root class="h-30 w-25">
                  <Card.Header>
                    <Card.Title>{games_info[game_id].name}</Card.Title>
                  </Card.Header>
                  <Card.Content
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <Card.Description>{games_info[game_id].description}</Card.Description>
                  </Card.Content>
                </Card.Root>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    </section>

    <section>
      <h1 class="text-2xl font-bold">Other Games</h1>
      <Carousel.Root
        opts={{
          align: "start"
        }}
        class="w-full mx-5 max-w-8xl"
      >
        <Carousel.Content>
          {#each Array(5) as _, i (i)}
            <Carousel.Item class="md:basis-1/3 lg:basis-1/4">
              <div class="p-1">
                <Card.Root class="h-30 w-25">
                  <Card.Content
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-3xl font-semibold">{i + 1}</span>
                  </Card.Content>
                </Card.Root>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    </section>

    <section>
      <h1 class="text-2xl font-bold">Characters</h1>
      <Carousel.Root
        opts={{
          align: "start"
        }}
        class="w-full mx-5 max-w-8xl"
      >
        <Carousel.Content>
          {#each Array(5) as _, i (i)}
            <Carousel.Item class="md:basis-1/3 lg:basis-1/4">
              <div class="p-1">
                <Card.Root class="h-30 w-25">
                  <Card.Content
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-3xl font-semibold">{i + 1}</span>
                  </Card.Content>
                </Card.Root>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    </section>
  </div>
</div>

