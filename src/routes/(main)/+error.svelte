<script lang="ts">
	import { page } from '$app/state';
</script>


<h1 class='text-3xl font-bold' >Whoops!</h1>
<h1 class='text-3xl' >{page.error.message}</h1>