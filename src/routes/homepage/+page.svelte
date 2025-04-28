<script>
// @ts-nocheck

  import * as Carousel from "$lib/components/ui/carousel/index.ts";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button, buttonVariants} from "$lib/components/ui/button/index.js";
  import { onMount } from 'svelte';

  const { data } = $props()
  const { session, supabase, allCharacters } = data;
  let fetchedUser = $state(null);
  let otherInfo = $state(null);
  let campaigns = $state(null);

  async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      fetchedUser = user;
    } else {
      fetchedUser = null;
    }
  }

  async function renderEachTime() {
    const response = await fetch('/campaign')
    campaigns = await response.json();
    getUser();
  }

  async function logout() {
		await supabase.auth.signOut();
		goto("/", { invalidateAll: true });
	}

  onMount (() => {
    getUser();
  })
</script>

<div class="w-full overflow-x-hidden px-5">
  <navigation class="fixed top-0 left-0 w-full flex justify-between items-center py-4 bg-white shadow-md z-10 px-5">
    <div class="flex items-center">
      <span>User ID: {fetchedUser?.id}</span>
    </div>
    <div class="text-center">
      <h2 class="text-xl font-bold">Guild Table</h2>
    </div>
    <div>
      <Button href="vtt/6802904e5750fa22e6ac3d33">VTT</Button>
      <Button onclick={logout} href="/">Logout</Button>
    </div>
  </navigation>
  <div class="pt-20 space-y-10">

    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Homepage</h1>

    <section>
      <Button class="text-2xl font-bold" href="/campaign" variant="ghost">My Campaigns</Button>
      {#if campaigns != null && campaigns > 0}
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
      <Button class="text-2xl font-bold inline" href="/campaign/play" variant="ghost">Other Campaigns</Button>
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
      <Button class="text-2xl font-bold inline" href="/character" variant="ghost">My Characters</Button>
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
                      <Card.Title>
                        <img src={`https://xkosdyzaaquclhzewzgh.supabase.co/storage/v1/object/public/character-avatars//${character._id}`} alt={character.name} class="w-20 h-20 rounded-full mb-2 inline" />
                        <h1 class="inline text-xl">{character.name}</h1>
                      </Card.Title>
                    </Card.Header>
                    <Card.Content class="flex flex-col aspect-square items-center justify-center p-6">
                        <p>Race: {character.race}</p>
                        <p>Class: {character.class}</p>
                        <p>Level: {character.level}</p>
                        <p>Age: {character.age}</p>
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

