<script lang="ts">
	import type { PageData } from "./$types.js";
	import Login from "./login.svelte";
	export let data: PageData;
 </script>
	
 <Login data={data.form} />