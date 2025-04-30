<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	const { data } = $props();
</script>

{#await data.wikis}
	<p>Grabbibg wiki pages...</p>
{:then wikis}
	{#if wikis.length == 0}
		<h1 class="text-3xl">Looks like you don't have any wiki pages yet...</h1>
	{:else}
		<Table.Root>
			<Table.Caption>A list of your wiki pages.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[200px]">Title</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each wikis as wiki (wiki._id)}
					<Table.Row>
						<a href={`/wiki/${wiki._id}`} class="block no-underline">
							<Table.Cell class="font-medium">{wiki.title}</Table.Cell>
						</a>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}
{/await}
