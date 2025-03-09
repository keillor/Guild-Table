<script lang='ts'>
	import { dnd5ApiSpellDetails } from "$lib/api/dnd5api_client";
    import * as Popover from "$lib/components/ui/popover/index.js";
	import { buttonVariants } from "../ui/button";
    const {spell, children} = $props()

    let isOpen = $state(false);
	let requested = $state(false);
    let resolve = null;
	let promise = new Promise((newResolve, _) => resolve = newResolve)
	
	const openChange = (open) => {
        if(open) {
            isOpen = open;
            if (!requested) {
                requested = true
                dnd5ApiSpellDetails(spell).then(resolve);
            }
        } else {
            isOpen = open;
        }
	}

</script>


<Popover.Root open={isOpen} onOpenChange={open => openChange(open)}>
    <Popover.Trigger class={buttonVariants({ variant: 'outline' })}>
        {@render children()}
    </Popover.Trigger>
    <Popover.Content>
        <p>Spell: <b>{spell}</b></p>
        {#await promise}
        <span>loading...</span>
        {:then details}
            {#each Object.entries(details) as [key, value]}
                <h3 class='font-bold'>{key}: </h3>
                <p>{value}</p>
            {/each}
        {:catch error}
            <p class='text-red-500'>Error! Please try again later.</p>
        {/await}
    </Popover.Content>
</Popover.Root>