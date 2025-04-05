<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
    import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Eye, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { buttonVariants } from '$lib/components/ui/button';
    
	const { data } = $props();
	let campaigns = $state(data.campaigns);
	const user = data.user;

	function handleEnhance({ formData }) {
		return async ({ result }) => {
			const response = await result;
			if (response.success) {
				const campaignId = formData.get('campaignId');
				campaigns = campaigns.filter((campaign) => campaign._id !== campaignId);
				toast.success('Campaign removed successfully.');
			} else {
				toast.error('Failed to remove campaign.');
			}
		};
	}
</script>

<h1 class="mb-4 text-3xl font-bold">Joined Campaigns</h1>

<Table.Root>
	<Table.Caption>A list of your campaigns.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[200px]">Campaign Name</Table.Head>
			<Table.Head>Description</Table.Head>
			<Table.Head>View</Table.Head>
			<Table.Head>Delete</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each campaigns as campaign (campaign._id)}
			<Table.Row>
				<Table.Cell class="font-medium">{campaign.name}</Table.Cell>
				<Table.Cell>{campaign.description}</Table.Cell>
				<Table.Cell>
					<Button variant="outline" href={`/campaign/play/${campaign._id}`}>
						<Eye />
					</Button>
				</Table.Cell>
				<Table.Cell>
					<AlertDialog.Root>
						<AlertDialog.Trigger class={buttonVariants({variant: 'outline'})}>
								<Trash />
						</AlertDialog.Trigger>
						<AlertDialog.Content>
							<AlertDialog.Header>
								<AlertDialog.Title>Are you sure you want to remove this campaign?</AlertDialog.Title
								>
								<AlertDialog.Description>This action cannot be undone!</AlertDialog.Description>
							</AlertDialog.Header>
							<AlertDialog.Footer>
								<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
								<form
									method="POST"
									action="?/removeUser"
									use:enhance={({ formData }) => {
										return async ({ result }) => {
											const response = await result;
											if (response.type == 'success') {
												const campaignId = formData.get('campaignId');
												toast.success('Campaign removed successfully.');
												campaigns = campaigns.filter((campaign) => campaign._id !== campaignId);
											} else {
												toast.error('Failed to remove campaign.');
											}
										};
									}}
								>
									<input type="hidden" name="campaignId" value={campaign._id} />
									<AlertDialog.Action type="submit" class={buttonVariants({variant: 'destructive'})}>
										Continue
									</AlertDialog.Action>
								</form>
							</AlertDialog.Footer>
						</AlertDialog.Content>
					</AlertDialog.Root>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
