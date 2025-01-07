<script>
  import { Button } from "$lib/components/ui/button/index";
  import * as Card from '$lib/components/ui/card/index';
  import Input from "@/components/ui/input/input.svelte";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Welcome to Guild Table!</Card.Title>
  </Card.Header>
  <Card.Content>
    <Input type='text' name='email' placeholder='user@email.com' class='max-w-xs'/>
    <Input type='password' name='password' placeholder='Password' class='max-w-xs'/>
    <Button href='/'>Login</Button>
    <Button href='/signup'>Signup</Button>
  </Card.Content>
</Card.Root>
