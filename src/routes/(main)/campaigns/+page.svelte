<script lang="ts">
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { campaignSchema } from './schema.ts';
	import * as Form from '$lib/components/ui/form/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	// Initialize the form with default values
	const form = superForm(
		defaults(
			{
				name: '',
				description: '',
				characterIds: [],
				mapIds: [],
				owner: '',
				users: [],
				invites: []
			},
			zodClient(campaignSchema)
		),
		{
			validators: zodClient(campaignSchema),
			dataType: 'json',
			resetForm: false,
			onError: ({ result }) => {
				console.error('Validation failed:', result);
			},
			onUpdated: ({ form: f }) => {
				if (f.valid) {
					console.log('Form is valid:', f.data);
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<div class='p-3'>
    <h1 class="mb-4 text-3xl font-bold">Game Management</h1>
    <form method="POST" use:enhance>
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
    
        <Form.Field {form} name="owner">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Owner</Form.Label>
                    <Input {...props} bind:value={$formData.owner} />
                {/snippet}
            </Form.Control>
            <Form.Description>The owner of the campaign.</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
    
        <Form.Field {form} name="characterIds">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Character IDs</Form.Label>
                    <Input
                        {...props}
                        bind:value={$formData.characterIds}
                        placeholder="Comma-separated character IDs"
                    />
                {/snippet}
            </Form.Control>
            <Form.Description>List the character IDs associated with this campaign.</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
    
        <Form.Field {form} name="mapIds">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Map IDs</Form.Label>
                    <Input {...props} bind:value={$formData.mapIds} placeholder="Comma-separated map IDs" />
                {/snippet}
            </Form.Control>
            <Form.Description>List the map IDs associated with this campaign.</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
    
        <Form.Field {form} name="users">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Users</Form.Label>
                    <Input {...props} bind:value={$formData.users} placeholder="Comma-separated user IDs" />
                {/snippet}
            </Form.Control>
            <Form.Description>List the user IDs associated with this campaign.</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
    
        <Form.Field {form} name="invites">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Invites</Form.Label>
                    <Input {...props} bind:value={$formData.invites} placeholder="Comma-separated invite IDs" />
                {/snippet}
            </Form.Control>
            <Form.Description>List the invite IDs for this campaign.</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
    
        <Button>Save Campaign</Button>
    </form>
</div>
