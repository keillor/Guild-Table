<script lang="ts">
  import type { PageData } from "./$types.js";
  import { Button } from '$lib/components/ui/button/index';
  import Login from "./login.svelte";
  export let data: PageData;
</script>
  
<div class="flex h-screen items-center justify-center">
  <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6">Sign In</h1>
    <Login data={data.form} />
    <Button href="/" class="mt-4 w-full bg-blue-500 text-white py-2 rounded">Return to Main Screen</Button>
  </div>
</div>


