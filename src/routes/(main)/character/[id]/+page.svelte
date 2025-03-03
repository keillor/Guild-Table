<script lang='ts'>
	import type { CharacterTypeTS } from "$lib/models/character";

    const data = $props();
    const character : CharacterTypeTS = data.data.character;
</script>

<p class='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
    {character.name}
</p>