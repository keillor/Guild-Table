<script>
  import "../app.css";
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import { Toaster } from "svelte-sonner";

  let { data, children } = $props()
  let { session, supabase } = $derived(data)

  onMount(() => { // Initial Render
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<svelte:head>
  <title>Guild Table</title>
  <meta name='description' content='A DND management platform.' />
</svelte:head>
<Toaster richColors/>
{@render children()}