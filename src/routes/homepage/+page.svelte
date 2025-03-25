<script>
// @ts-nocheck

  import * as Carousel from "$lib/components/ui/carousel/index.ts";
  import * as Card from "$lib/components/ui/card/index.js";
  import {Button} from "$lib/components/ui/button/index.js";
  import { onMount, afterUpdate } from 'svelte';

export let data;
let { session, supabase, allCharacters } = data;
let fetchedUser = null;
let activeCampaigns = null;
let otherInfo = null;


async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    fetchedUser = user;
  } else {
    fetchedUser = null;
  }
}

async function renderEachTime() {
  getUser();
}

onMount (() => {
  renderEachTime();
})

afterUpdate (() => {
  renderEachTime();
})
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
      <Button href="/character">Characters</Button>
      <Button href="/vtt">VTT</Button>
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
          <Button>Dismiss</Button>
        </Card.Footer>
      </Card.Root>  
    </div>

    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Homepage</h1>

    <section>
      <h1 class="text-2xl font-bold inline">My Games</h1>
      <Button>Create Game</Button>
      {#if activeCampaigns != null}
        <Carousel.Root
          opts={{
            align: "start"
          }}
          class="w-full mx-5 max-w-8xl"
        >
          <Carousel.Content>
            {#each activeCampaigns as game (game._id)}
              <Carousel.Item class="md:basis-1/3 lg:basis-1/4">
                <div class="p-1">
                  <Card.Root class="h-30 w-25">
                    <Card.Header>
                      <Card.Title>{game.name}</Card.Title>
                    </Card.Header>
                    <Card.Content
                      class="flex aspect-square items-center justify-center p-6"
                    >
                      <Card.Description>{game.description}</Card.Description>
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Root>
      {:else}
        <p>No active campaigns available.</p>
      {/if}
    </section>

    <section>
      <h1 class="text-2xl font-bold">Other Games</h1>
      {#if otherInfo != null}
        <Carousel.Root
          opts={{
            align: "start"
          }}
          class="w-full mx-5 max-w-8xl"
        >
          <Carousel.Content>
            {#each otherInfo as game (game._id)}
              <Carousel.Item class="md:basis-1/3 lg:basis-1/4">
                <div class="p-1">
                  <Card.Root class="h-30 w-25">
                    <Card.Header>
                      <Card.Title>{game.name}</Card.Title>
                    </Card.Header>
                    <Card.Content
                      class="flex aspect-square items-center justify-center p-6"
                    >
                      <Card.Description>{game.description}</Card.Description>
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Root>
      {:else}
        <p>No other information available.</p>
      {/if}
    </section>

    <section>
      <h1 class="text-2xl font-bold">Characters</h1>
      {#if allCharacters.length > 0}
        <Carousel.Root
          opts={{
            align: "start"
          }}
          class="w-full mx-5 max-w-8xl"
        >
          <Carousel.Content>
            {#each allCharacters as character}
              <Carousel.Item class="md:basis-1/3 lg:basis-1/4">
                <div class="p-1">
                  <Card.Root class="h-30 w-25">
                    <Card.Header>
                      <Card.Title>{character.name}</Card.Title>
                    </Card.Header>
                    <Card.Content
                      class="flex aspect-square items-center justify-center p-6"
                    >
                      <Card.Description>
                        <p> Character description: uncommenting currently results in white screen </p>
                        <!-- <div class="flex flex-col"></div>
                          <p>Race: {character.race}</p>
                          <p>Class: {character.class}</p>
                          <p>Level: {character.level}</p>
                          <p>Age: {character.age}</p>
                        </div> -->
                      </Card.Description>
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Root>
      {:else}
        <p>No characters available.</p>
      {/if}
  </div>
</div>

