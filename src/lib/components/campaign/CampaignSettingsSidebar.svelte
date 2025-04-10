<script>
	import Button from "../ui/button/button.svelte";
    import { page } from "$app/state";
    const settingsPages = [
        {
            name: 'General',
            urlFrag: `campaign/${page.params.id}/general`
        },
        {
            name: 'Wiki',
            urlFrag: `campaign/${page.params.id}/wiki`
        },
        {
            name: 'Users',
            urlFrag: `campaign/${page.params.id}/users`
        },
        {
            name: 'Monsters',
            urlFrag: `campaign/${page.params.id}/monsters`
        },
        {
            name: 'Maps',
            urlFrag: `campaign/${page.params.id}/maps`
        },
    ]
</script>

<div class='flex flex-row w-min'>
    {#each settingsPages as link}
        <Button variant='outline' href={`/${link.urlFrag}`}>
            {link.name}
        </Button>
    {/each}
</div>