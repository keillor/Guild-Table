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
		<div class='p-3'>
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>