<script>
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button/index";
    import * as Card from "$lib/components/ui/card/index";
    import * as Avatar from "$lib/components/ui/avatar/index"
    const characters = [
        {
            name: 'Percy Jackson',
            race: 'Elf',
            class: 'Mage',
            avatar: 'https://i.pinimg.com/736x/7f/f0/d8/7ff0d8a948987b7660a09fea4e7de228.jpg',
            campaign: ''
        },
        {
            name: 'Harry Potter',
            race: 'Human',
            class: 'Ranger',
            avatar: 'https://assets-prd.ignimgs.com/2021/01/26/harry-potter-button-1611619333944.jpg'
        },
        {
            name: 'Hercules',
            race: 'Dragonborn',
            class: 'Rogue',
            avatar: 'https://s.yimg.com/ny/api/res/1.2/IvwOWc7HAW93981UTEeEYw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ1Mw--/https://media.zenfs.com/en/huffpost_uk_744/c3f7711ac372f2e3a47008733738a6ba'
        },
        {
            name: 'Spiderman',
            race: 'Spider',
            class: 'Bard',
            avatar: 'https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTc4NzQ2NjU0ODYxMTgw/tom-holland-spider-man-ftr.jpg'
        }
    ]
</script>	

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Character Manage
</h1>


<Card.Root class='p-3'>
    <Button href='/character/create'>Create New Character</Button>
</Card.Root>

<h2 class='mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
    Your Characters
</h2>
<div class='grid grid-cols-3'>
    {#each characters as character}
        <Card.Root class='place-content-center'>
            <Avatar.Root>
                <Avatar.Image src={character.avatar}/>
                <Avatar.Fallback>N/A</Avatar.Fallback>
            </Avatar.Root>
            <h3>{character.name}</h3>
        </Card.Root>
    {/each}
</div>
