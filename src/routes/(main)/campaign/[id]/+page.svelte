<script lang="ts">
    import type { Campaign } from "$lib/models/Campaign";
    import Button from "$lib/components/ui/button/button.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Trash, Plus } from 'lucide-svelte/icons';
    import { enhance } from "$app/forms";
    import Input from "$lib/components/ui/input/input.svelte";
	import { toast } from "svelte-sonner";

    const { data } = $props();

    let campaignInstance = $state(data.campaign);

    let inviteToAdd = "";
    let mapIdToAdd = "";
</script>

<h1 class="mb-4 text-3xl font-bold">Edit Campaign: {campaignInstance.name}</h1>

<!-- Name/Description Form -->
<form method="POST" action="?/changeName" use:enhance={({ formData }) => {
    return async ({ result }) => {
        const response = await result;
        if (response.type === "success") {
            toast.success('Campaign name / description updated!')
            campaignInstance.name = formData.get("name");
            campaignInstance.description = formData.get("description");
        } else {
            toast.error('Campaign not updated.')
        }
    };
}}>
    <div class="mb-4">
        <Label for="name">Campaign Name</Label>
        <Input id="name" name="name" value={campaignInstance.name} />
    </div>
    <div class="mb-4">
        <Label for="description">Campaign Description</Label>
        <Input id="description" name="description" value={campaignInstance.description} />
    </div>
    <Button type="submit">Save Name/Description</Button>
</form>

<!-- Invites Form -->
<form method="POST" action="?/inviteUser" use:enhance={({ formData }) => {
    return async ({ result }) => {
        const response = await result;
        if (response.type === "success") {
            campaignInstance.invites = [...campaignInstance.invites, formData.get("invite")];
            inviteToAdd = ""; // Clear the input field
            toast.success('Invited user!')
        } else {
            toast.error('Failed to invite user!')
        }
    };
}}>
    <div class="mb-4">
        <Label for="invite">Invite User (UID)</Label>
        <div class="flex items-center gap-2">
            <Input id="invite" name="invite" bind:value={inviteToAdd} placeholder="Enter user UID" />
            <Button type="submit" variant="outline">
                <Plus class="size-4" />
            </Button>
        </div>
    </div>
</form>
<ul class="mt-2">
    {#each campaignInstance.invites as invite}
        <li class="flex items-center gap-2">
            <span>{invite}</span>
            <Button
                type="button"
                variant="outline"
                on:click={() => (campaignInstance.invites = campaignInstance.invites.filter((i) => i !== invite))}
            >
                <Trash class="size-4" />
            </Button>
        </li>
    {/each}
</ul>

<!-- Map IDs Form -->
<form method="POST" action="?/addMap" use:enhance={({ formData }) => {
    return async ({ result }) => {
        const response = await result;
        if (response.type === "success") {
            campaignInstance.mapIds = [...campaignInstance.mapIds, formData.get("mapId")];
            mapIdToAdd = ""; // Clear the input field
        }
    };
}}>
    <div class="mb-4">
        <Label for="mapId">Add Map ID</Label>
        <div class="flex items-center gap-2">
            <Input id="mapId" name="mapId" bind:value={mapIdToAdd} placeholder="Enter map ID" />
            <Button type="submit" variant="outline">
                <Plus class="size-4" />
            </Button>
        </div>
    </div>
</form>
<ul class="mt-2">
    {#each campaignInstance.mapIds as mapId}
        <li class="flex items-center gap-2">
            <span>{mapId}</span>
            <Button
                type="button"
                variant="outline"
                on:click={() => (campaignInstance.mapIds = campaignInstance.mapIds.filter((id) => id !== mapId))}
            >
                <Trash class="size-4" />
            </Button>
        </li>
    {/each}
</ul>


