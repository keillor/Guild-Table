<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	const { children, character } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'ghost' })} type='button'>{@render children()}</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Upload Avatar</Dialog.Title>
			<Dialog.Description>
				Upload a character avatar here. Photo upload must not exceed 5 MB.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Character</Label>
				<Input id="name" disabled value={character.name} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="Avatar" class="text-right">Avatar</Label>
				<Input type="file"
				name="avatar"
				id="avatar"
				value=""
                form={character._id}
				accept="image/*"
				hidden
				class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
            <Button form={character._id} type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<input hidden name='characterId' value={character._id}/>