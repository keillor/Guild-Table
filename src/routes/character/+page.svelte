<script>
    import { Button } from "$lib/components/ui/button/index";
    import * as Card from "$lib/components/ui/card/index";
    import * as Avatar from "$lib/components/ui/avatar/index"
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import { Pencil, Trash} from "lucide-svelte/icons";
    const characters = [
        {
            name: 'Percy Jackson',
            race: 'Elf',
            class: 'Mage',
            avatar: 'https://i.pinimg.com/736x/7f/f0/d8/7ff0d8a948987b7660a09fea4e7de228.jpg',
            campaign: 'Toads'
        },
        {
            name: 'Harry Potter',
            race: 'Human',
            class: 'Ranger',
            avatar: 'https://assets-prd.ignimgs.com/2021/01/26/harry-potter-button-1611619333944.jpg',
            campaign: 'Toads'
        },
        {
            name: 'Hercules',
            race: 'Dragonborn',
            class: 'Rogue',
            avatar: 'https://s.yimg.com/ny/api/res/1.2/IvwOWc7HAW93981UTEeEYw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ1Mw--/https://media.zenfs.com/en/huffpost_uk_744/c3f7711ac372f2e3a47008733738a6ba',
            campaign: 'Toads'
        },
        {
            name: 'Spiderman',
            race: 'Spider',
            class: 'Bard',
            avatar: 'https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTc4NzQ2NjU0ODYxMTgw/tom-holland-spider-man-ftr.jpg',
            campaign: 'Toads'
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
<div class='grid grid-cols-3 gap-3'>
    {#each characters as character}
        <Card.Root>
            <Card.Header>
                <div class="flex flex-row justify-between items-center">
                    <h3 class="text-xl font-semibold">{character.name}</h3>
                    <Avatar.Root class='h-12 w-12'>
                        <Avatar.Image src={character.avatar}/>
                        <Avatar.Fallback>N/A</Avatar.Fallback>
                    </Avatar.Root>
                </div>
            </Card.Header>
            <Card.Content>
                <div>
                    <p>Race: {character.race}</p>
                    <p>Class: {character.class}</p>
                    <p>Campaign: {character.campaign}</p>
                </div>
            </Card.Content>
            <Card.Footer class='flex justify-between'>
                <Button variant='outline'>
                    <Pencil class='mr-2 size-4'/>
                    Edit
                </Button>
                
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button variant='outline'>
                            <Trash class='mr-2 size-4'/>
                            Trash
                        </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content>
                      <AlertDialog.Header>
                        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                        <AlertDialog.Description>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialog.Description>
                      </AlertDialog.Header>
                      <AlertDialog.Footer>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                        <AlertDialog.Action class='bg-red-300 hover:bg-red-500'>Delete</AlertDialog.Action>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog.Root>
            </Card.Footer>
            
            
        </Card.Root>
    {/each}
</div>
