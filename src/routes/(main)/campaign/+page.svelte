<script lang="ts">
	import { Plus, Settings, Swords, Trash } from 'lucide-svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form/index.js';
	import { enhance as svelteEnhance } from '$app/forms';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { campaignSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';

	const { data } = $props();
	let campaigns = $state(data.result);
	let open = $state(false);
	const form = superForm(
		defaults(
			{
				name: '',
				description: ''
			},
			zodClient(campaignSchema)
		),
		{
			validators: zodClient(campaignSchema),
			dataType: 'json',
			resetForm: false,
			onSubmit: () => {
				open = false;
			},
			onError: ({ result }) => {
				console.error('Validation failed:', result);
			},
			onUpdate({ form: f, result }) {
				console.log(f);
				if (f.valid) {
					console.log(f)
					const newName = result.data.form.name
					const newDesc = result.data.form.description
					const campaignId = result.data.campaignId
					campaigns = [...campaigns, {name: newName, description: newDesc, _id: campaignId}]

					goto(`/campaign/${result.data.campaignId}`);
				} else {
					open = true;
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<h1 class="mb-4 text-3xl font-bold">Game Management</h1>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<Plus class="size-4" />
		New Campaign
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<form method="POST" action="?/new" use:enhance>
			<AlertDialog.Header>
				<AlertDialog.Title>Create a new campaign</AlertDialog.Title>
				<AlertDialog.Description>
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Campaign Name</Form.Label>
								<Input {...props} bind:value={$formData.name} />
							{/snippet}
						</Form.Control>
						<Form.Description>The name of your campaign.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="description">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Description</Form.Label>
								<Textarea
									{...props}
									bind:value={$formData.description}
									class="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm"
								/>
							{/snippet}
						</Form.Control>
						<Form.Description>Provide a brief description of your campaign.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>

<table class="w-full table-auto border-collapse border border-gray-300">
	<thead>
		<tr>
			<th class="border border-gray-300 px-4 py-2">Title</th>
			<th class="border border-gray-300 px-4 py-2">Description</th>
			<th class="border border-gray-300 px-4 py-2">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each campaigns as campaign}
			<tr>
				<td class="border border-gray-300 px-4 py-2">{campaign.name}</td>
				<td class="border border-gray-300 px-4 py-2"
					>{campaign.description || 'No description provided'}</td
				>
				<td class="border border-gray-300 px-4 py-2">
					<div class="flex gap-2">
						<Button variant='outline' href='#'>
							<Swords class='size-4'/>
							Play
						</Button>
						<Button variant='outline' href={`/campaign/${campaign._id}/general`}>
							<Settings class='size-4'/>
							Settings
						</Button>
						<AlertDialog.Root>
							<AlertDialog.Trigger class={buttonVariants({variant: 'outline'})}>
									<Trash class="mr-2 size-4" />
									Delete
							</AlertDialog.Trigger>
							<AlertDialog.Content>
								<AlertDialog.Header>
									<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
									<AlertDialog.Description>
										This action cannot be undone.
									</AlertDialog.Description>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<AlertDialog.Cancel type='button'>Cancel</AlertDialog.Cancel>
									<form method='POST' action='?/delete' use:svelteEnhance={() => {
										return async({result}) => {
											const results = await result;
											campaigns = campaigns.filter((c) => c._id !== campaign._id);
										}
									}}>
										<input hidden name='id' value={campaign._id}/>
										<AlertDialog.Action class={buttonVariants({variant: 'destructive'})}>Delete</AlertDialog.Action>
									</form>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
