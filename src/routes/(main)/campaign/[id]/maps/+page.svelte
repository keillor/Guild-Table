<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Ellipsis, Plus, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
    import { buttonVariants } from '$lib/components/ui/button/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { getAvatar } from '$lib/utilities/character/character.js';


	const { data } = $props();
	let campaignInstance = $state(data.campaign);
	let mapIdToAdd = $state('');
    let open = $state(false);
</script>

<!-- New Map dialog -->
<form name='newMap' id='newMap' method='POST' action='?/addMap' enctype="multipart/form-data" use:enhance={({ formData }) => {
    return async ({ result }) => {
        const response = await result;
        console.log(response);
        if (response.type === 'success') {
            campaignInstance.mapIds = [...campaignInstance.mapIds, {id: response.data.map.id, name: response.data.map.name}];
            mapIdToAdd = ''; // Clear the input field
            toast.success('Map uploaded!');
            open = false;
        } else {
            toast.error('Failed to upload map.')
        }
    };
}}>
    <Dialog.Root bind:open>
        <Dialog.Trigger class={buttonVariants({ variant: 'default' })} type='button'>New Map</Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
            <Dialog.Header>
                <Dialog.Title>Upload Map</Dialog.Title>
                <Dialog.Description>
                    Upload a map here. Photo upload must not exceed 10 MB.
                </Dialog.Description>
            </Dialog.Header>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">Name</Label>
                    <Input name='name' value='' form='newMap' placeholder='Map Name' class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="map" class="text-right">Map</Label>
                    <Input type="file"
                    name="map"
                    value=""
                    form='newMap'
                    accept="image/*"
                    hidden
                    class="col-span-3" />
                </div>
            </div>
            <Dialog.Footer>
                <Button form='newMap' type="submit">Save changes</Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
</form>

<div class="flex flex-row rounded-md gap-3 flex-wrap">
    {#each campaignInstance.mapIds as map}
        <form method='POST' action='?/removeMap' name={map.id} id={map.id} use:enhance={({ formData }) => {
            return async ({ result }) => {
                const response = await result;
                if (response.type === 'success') {
                    // Remove the map from the list
                    campaignInstance.mapIds = campaignInstance.mapIds.filter((m) => m.id !== formData.get('mapId'));
                    toast.success('Map removed successfully!');
                } else {
                    // Refresh the page on failure
                    toast.error('Failed to remove map.');
                }
            };
        }}>
            <div class='bg-foreground rounded-md p-1'>
                <span class='text-background font-bold flex flex-row items-center justify-between'>
                    {map.name}
                    {@render dropdown(map.id)}
                </span>
                <img class='w-fit rounded-md max-w-[500px] max-h-[1000px] object-cover' loading='lazy' alt='a dungeons and dragons style map.' src={getAvatar(map.id)}/>
            </div>
            <input readonly hidden name='mapId' id='mapId' value={map.id}/>
        </form>
    {/each}
</div>

{#snippet dropdown(id)}
<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <Ellipsis />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>Map Options</DropdownMenu.GroupHeading>
            <DropdownMenu.Separator />
                <DropdownMenu.Item class='text-destructive' onclick={() => {
                    const form = document.getElementById(id);
                    if (form) {
                        form.requestSubmit();
                    }
                }}>Delete</DropdownMenu.Item>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
</DropdownMenu.Root>
{/snippet}

