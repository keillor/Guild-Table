<script>
	import Button from "../ui/button/button.svelte";

    const settingsPages = [
        {
            name: 'Campaign',
            url: '.'
        },
        {
            name: 'Wiki',
            url: './wiki'
        },
        {
            name: 'Characters',
            url: './characters'
        }
    ]
</script>

<div class='flex flex-row w-min'>
    {#each settingsPages as link}
        <Button variant='outline' href={link.url}>
            {link.name}
        </Button>
    {/each}
</div>