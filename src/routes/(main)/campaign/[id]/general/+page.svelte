<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { enhance } from '$app/forms';
	import Input from '$lib/components/ui/input/input.svelte';
	import { toast } from 'svelte-sonner';
	const { data } = $props();

	let campaignInstance = $state(data.campaign);
</script>

<h1 class="mb-4 text-3xl font-bold">Edit Campaign: {campaignInstance.name}</h1>

<!-- Name/Description Form -->
<form
	method="POST"
	action="?/changeName"
	use:enhance={({ formData }) => {
		return async ({ result }) => {
			const response = await result;
			if (response.type === 'success') {
				toast.success('Campaign name / description updated!');
				campaignInstance.name = formData.get('name');
				campaignInstance.description = formData.get('description');
			} else {
				toast.error('Campaign not updated.');
			}
		};
	}}
>
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
