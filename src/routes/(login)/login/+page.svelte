<script>
  import { Button } from "$lib/components/ui/button/index";
  import * as Card from '$lib/components/ui/card/index';
  import Input from "@/components/ui/input/input.svelte";
	import Label from "@/components/ui/label/label.svelte";
</script>

<div class='flex h-screen w-full items-center justify-center px-4'>
  <Card.Root class='mx-auto max-w-sm'>
    <Card.Header>
      <Card.Title>Welcome to Guild Table!</Card.Title>
    </Card.Header>
    <Card.Content class="grid gap-4">
      <Label for='email'>Email</Label>
      <Input type='text' name='email' placeholder='email@example.com' class='max-w-xs'/>

      <Label for='password'>Password</Label>
      <Input type='password' name='password' placeholder='Password' class='max-w-xs'/>

      <Button href='/'>Login</Button>
      <Button variant="outline" class="w-full">Login with Google</Button>

      <p>Don't have an account? <a href="/signup" class="underline"> Sign up </a></p>     
    </Card.Content>
  </Card.Root>
</div>

