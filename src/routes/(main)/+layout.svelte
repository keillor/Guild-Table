<script>
// @ts-nocheck

	import '../../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import AppSidebar from '@/components/app-sidebar.svelte';
	let { children, data } = $props();
	const user = data.user;
</script>

<Sidebar.Provider>
	<AppSidebar {user} />
	<Sidebar.Inset>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>