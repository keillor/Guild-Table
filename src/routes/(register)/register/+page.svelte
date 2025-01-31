<script lang="ts">
  import type { PageData } from "./$types.js";
  import { Button } from '$lib/components/ui/button/index';
  import Register from "./register.svelte";
  export let data: PageData;
 </script>
  
<div class="flex h-screen items-center justify-center">
  <div class="max-w-xs flex-grow">
    <h1 class="text-2xl font-bold">Register</h1>
    <Register data={data.form} />
  </div>
  <Button href="/">return to Main Screen</Button>
</div>


