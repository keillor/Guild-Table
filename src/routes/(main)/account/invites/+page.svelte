<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Clipboard } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	const { data } = $props();
	const campaigns = $state(data.campaigns);

	// Function to handle form submission
	function handleAccept({ formData }) {
		return async ({ result }) => {
			const response = await result;
			if (response.type === 'success') {
				console.log('Action successful:', response);
				toast.info('Invite was accepted.');
			} else {
				console.error('Action failed:', response);
				toast.info('Failed to accept invite.');
			}
		};
	}
    function handleReject({ formData }) {
		return async ({ result }) => {
			const response = await result;
			if (response.type === 'success') {
				console.log('Action successful:', response);
				toast.info('Invite was rejected.');
			} else {
				console.error('Action failed:', response);
				toast.info('Failed to reject invite.');
			}
		};
	}
</script>

<h1 class="mb-4 text-3xl font-bold">Campaign Invites</h1>

<p>Your invite id: 
	<span class='underline'>
		{data.session.user.id}
	</span>
	<Button variant='outline' onclick={() => navigator.clipboard.writeText(data.session.user.id)}>
		<Clipboard/>
	</Button>
</p>

{#if campaigns.length < 1}
    <p>Looks like you don't have any invitations yet...</p>
{:else}
	<table class="w-full table-auto border-collapse border border-gray-300">
		<thead>
			<tr>
				<th class="border border-gray-300 px-4 py-2">Name</th>
				<th class="border border-gray-300 px-4 py-2">Description</th>
				<th class="border border-gray-300 px-4 py-2">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each campaigns as campaign}
				<tr>
					<td class="border border-gray-300 px-4 py-2">{campaign.name}</td>
					<td class="border border-gray-300 px-4 py-2">{campaign.description}</td>
					<td class="border border-gray-300 px-4 py-2">
						<div class="flex gap-2">
							<!-- Accept Form -->
							<form method="POST" action="?/accept" use:enhance={handleAccept}>
								<input type="hidden" name="campaignId" value={campaign._id} />
								<Button type="submit" variant="outline">Accept</Button>
							</form>

							<!-- Reject Form -->
							<form method="POST" action="?/reject" use:enhance={handleReject}>
								<input type="hidden" name="campaignId" value={campaign._id} />
								<Button type="submit" variant="outline">Reject</Button>
							</form>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
