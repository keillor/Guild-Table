<script>
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import AppSidebar from '@/components/app-sidebar.svelte';
	let { children } = $props();
</script>
<Sidebar.Provider>
	<AppSidebar/>
	<Sidebar.Inset>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>