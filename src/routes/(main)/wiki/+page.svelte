<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Eye, Plus, Trash } from 'lucide-svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	const { data } = $props();
	let errorText = $state();
	let wikiPages = $state(data.wikiPages);
</script>


<h1 class="mb-4 text-3xl font-bold">Wiki Pages</h1>
<AlertDialog.Root>
	<AlertDialog.Trigger class={`${buttonVariants({ variant: 'default' })} w-min`}>
		<Plus class="size-4" />
		New Wiki
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<form
			method="POST"
			action="?/new"
			use:enhance={() => {
				return async ({ result }) => {
					errorText = '';
					const results = await result;
					if (result.type == 'success') {
						goto(`/wiki/${result.data}`);
					} else {
						errorText = result.error.message;
					}
					console.log(results);
				};
			}}
		>
			<AlertDialog.Header>
				<AlertDialog.Title>Create a new wiki page</AlertDialog.Title>
				<AlertDialog.Description>
					<Label for="wikiname">New Wiki Title</Label>
					{#if errorText}
						<p class="text-red-500">{errorText}</p>
					{/if}
					<Input name="wikiname" placeholder="wiki name" />
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>

{#await wikiPages}
	<!-- //empty -->
{:then wikiPages}

{#if wikiPages.length == 0}
	<h1 class='text-3xl'>Looks like you don't have any wiki pages yet...</h1>
{:else}
	<table class="w-full table-auto border-collapse border border-gray-300">
		<thead>
			<tr>
				<th class="border border-gray-300 px-4 py-2">Title</th>
				<th class="border border-gray-300 px-4 py-2">Campaign</th>
				<th class="border border-gray-300 px-4 py-2">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each wikiPages as wiki}
				<tr>
					<td class="border border-gray-300 px-4 py-2">{wiki.title}</td>
					<td class="border border-gray-300 px-4 py-2">{wiki.campaign || 'No Campaign'}</td>
					<td class="flex flex-row border border-gray-300 px-4 py-2">
						<Button
							class={`${buttonVariants({ variant: 'outline' })} hover:underline`}
							href={`/wiki/${wiki._id}`}
						>
							<Eye class="size-4 text-black" />
						</Button>

						<AlertDialog.Root>
							<AlertDialog.Trigger class={`${buttonVariants({ variant: 'outline' })} w-min`}>
								<Trash class="size-4" />
							</AlertDialog.Trigger>
							<AlertDialog.Content>
								<AlertDialog.Header>
									<AlertDialog.Title>Are you sure you want to delete?</AlertDialog.Title>
									<AlertDialog.Description>This action cannot be undone!</AlertDialog.Description>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
									<form
										method="POST"
										action="?/delete"
										use:enhance={({ formData }) => {
											formData.append('objectId', wiki._id);
											return async ({ result }) => {
												await result;
												console.log(result);
												if (result.type == 'success') {
													//wikiPages = wikiPages.filter((w) => w._id !== wiki._id);
												}
											};
										}}
									>
										<AlertDialog.Action
											type="submit"
											class={buttonVariants({ variant: 'destructive' })}
											onclick="()">Continue</AlertDialog.Action
										>
									</form>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

{/await}
