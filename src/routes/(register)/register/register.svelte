<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "./schema";
  import {
   type SuperValidated,
   type Infer,
   superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  
  export let data: SuperValidated<Infer<FormSchema>>;
  
  const form = superForm(data, {
   validators: zodClient(formSchema),
  });
  
  const { form: formData, enhance } = form;
</script>
  
<form method="POST" class="border border-gray-300 p-2 mb-4 w-full rounded bg-gray-100" use:enhance>
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
    <Form.Label>Email</Form.Label>
    <Input {...attrs} bind:value={$formData.email} type="email"/>
    </Form.Control>
    <Form.Description>This is your email.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <Input {...attrs} bind:value={$formData.password} type="password"/>
    </Form.Control>
    <Form.Description>This is your password.</Form.Description>
    <Form.FieldErrors />
    </Form.Field>
  <Form.Button>Create New Account</Form.Button>
</form>