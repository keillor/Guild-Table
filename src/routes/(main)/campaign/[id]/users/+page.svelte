<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Plus } from 'lucide-svelte/icons';
	import { enhance } from '$app/forms';
	import Input from '$lib/components/ui/input/input.svelte';
	import { toast } from 'svelte-sonner';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	const { data } = $props();

	let campaignInstance = $state(data.campaign);
	let inviteToAdd = $state('');
</script>
<!-- Invites Form -->
<form
	method="POST"
	action="?/inviteUser"
	use:enhance={({ formData }) => {
		return async ({ result }) => {
			const response = await result;
			if (response.type === 'success') {
				campaignInstance.invites = [...campaignInstance.invites, formData.get('invite')];
				inviteToAdd = ''; // Clear the input field
				toast.success('Invited user!');
			} else {
				toast.error(`Failed to invite user!\n${response.error.message}`);
			}
		};
	}}
>
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

<Label>Invites</Label>
<ul class="mt-2">
	{#each campaignInstance.invites as invite}
		<li class="flex items-center gap-2">
			<Badge>{invite}</Badge>
		</li>
	{/each}
</ul>


<Label>Users</Label>
<ul class="mt-2 flex flex-row gap-2">
	{#if campaignInstance.users.length < 1}
		<p>Looks like you haven't invited anyone yet. When you do, they will appear here.</p>
	{/if}
	{#each campaignInstance.users as user}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Badge>{user}</Badge>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56">
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading>User Actions</DropdownMenu.GroupHeading>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<form action='?/removeUser' method='POST' use:enhance={({ formData }) => {
							return async ({ result }) => {
								const response = await result;
								if (response.type === 'success') {
									toast.success(`Removed user ${user}.`);
									campaignInstance.users = campaignInstance.users.filter((u) => u !== user);
								} else {
									toast.error(`Failed to remove user ${user}.`);
								}
							};
						}}>
							<input hidden name='campaignId' value={campaignInstance._id}/>
							<input hidden name='uid' value={user}/>
							<DropdownMenu.Item onclick={() => event.target.closest('form').requestSubmit()}>
								Remove from Campaign
							</DropdownMenu.Item>
						</form>
					</DropdownMenu.Group>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/each}
</ul>
