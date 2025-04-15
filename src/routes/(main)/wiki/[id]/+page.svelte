<script lang="ts">
	import Milkdown from '$lib/components/markdown/Milkdown.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Wiki } from '$lib/models/wikipage';
	import { Save } from 'lucide-svelte';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { wikiSchema } from './schema.js';
	import { toast } from 'svelte-sonner';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Form from "$lib/components/ui/form/index.js";
	const { data } = $props();
	const myWiki: Wiki = data.wikiPage;
	console.log(myWiki);
	let milkdownRef;
	function handleSave() {
		const markdown = milkdownRef.saveMarkdown();
		return markdown;
	}

	const form = superForm(defaults({ ...myWiki }, zodClient(wikiSchema)), {
		validators: zodClient(wikiSchema),
		dataType: "json",
		resetForm: false,
		onSubmit: ({jsonData}) => {
			return jsonData({
				title: $formData.title,
				text: handleSave(),
				owner: $formData.owner,
				campaign: $formData.campaign,
				public: $formData.public,
				_id: $formData._id
			});
		},
		onError: ({ result }) => {
			toast.error('Failed to save wiki!');
		},
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Wiki saved!');
			}
		}
	});

	const { form: formData, enhance, restore } = form;
	console.log($formData);
</script>

<div class="p-3">
	{#if myWiki != null}
		<form
			method="POST"
			use:enhance>
			<Button type="submit">
				<Save class="size-4" />
				Save
			</Button>
			<Form.Field {form} name="title">
				<Form.Control>
				  {#snippet children({ props })}
					<Input {...props} bind:value={$formData.title} placeholder='Wiki Title' />
				  {/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			  </Form.Field>
		</form>
		<Milkdown bind:this={milkdownRef} markdown={myWiki} />
	{:else}
		<h1 class="text-destructive">Whoops!</h1>
		<p>Looks like there was a problem! Please try again later.</p>
	{/if}
</div>