<script lang='ts'>
    const { id } = $props();
    interface CharacterLink {
        name: string,
        url: string
    }
    const characterLinks: CharacterLink[] = [
        {
            name: 'Edit Equipped Items',
            url: `/character/${id}/equipment`,
        },
        
        {
            name: 'Edit Character Ability Scores',
            url: `/character/create/scores/${id}`,
        },
        {
            name: 'View Character',
            url: `/character/${id}/view`,
        },
        {
            name: 'View All Characters',
            url: `/character/`,
        }
    ]
</script>

<div class='flex flex-col'>
    <h3 class="font-bold">Relevant Links:</h3>
    <ul>
        {#each characterLinks as link}
            <li class='underline target:text-destructive'><a href={link.url}>{link.name}</a></li>
        {/each}
    </ul>
</div>