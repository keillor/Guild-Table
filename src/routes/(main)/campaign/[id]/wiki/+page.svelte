<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";
	import Button from '$lib/components/ui/button/button.svelte';
	import { Eye, Plus, Trash } from 'lucide-svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from "$app/state";

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
						<p class="text-destructive">{errorText}</p>
					{/if}
					<Input name="wikiname" placeholder="wiki name" />
                    <input hidden name='campaign' value={page.params.id}/>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
{#if wikiPages.length == 0}
	<h1 class="text-3xl">Looks like you don't have any wiki pages yet...</h1>
{:else}
	<Table.Root>
		<Table.Caption>A list of your wiki pages.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[200px]">Title</Table.Head>
				<Table.Head>Campaign</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each wikiPages as wiki (wiki._id)}
				<Table.Row>
					<Table.Cell class="font-medium">{wiki.title}</Table.Cell>
					<Table.Cell>{wiki.campaign || 'No Campaign'}</Table.Cell>
					<Table.Cell class="text-right flex gap-2">
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
											return async ({ result }) => {
												await result;
												if (result.type == 'success') {
													wikiPages = wikiPages.filter((w) => w._id !== wiki._id);
												}
											};
										}}
									>
										<input hidden name="objectId" value={wiki._id} />
                                        <input hidden name='campaign' value={page.params.id}/>
										<AlertDialog.Action
											type="submit"
											class={buttonVariants({ variant: 'destructive' })}
										>
											Delete
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
{/if}
