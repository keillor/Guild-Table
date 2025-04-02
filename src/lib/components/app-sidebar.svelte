<script lang='ts'>
	import { House, Library, Users, MessageSquareCode, GalleryVerticalEnd, Frame, Command, ChartPie, AudioWaveform, Settings } from 'lucide-svelte';
	
	let { ref = $bindable(null), collapsible = 'icon', user, ...restProps } = $props();

	const data = {
		user: {
			name: user.email,
			email: user.email,
			avatar:
				'https://imgcdn.stablediffusionweb.com/2024/4/13/9b63df72-55ff-46fd-a5b4-7941b198db95.jpg'
		},
		teams: [
			{
				name: 'Acme Inc',
				logo: GalleryVerticalEnd,
				plan: 'Enterprise'
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveform,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: Command,
				plan: 'Free'
			}
		],
		navMain: [
			{
				title: 'Home',
				url: '/homepage',
				icon: House,
				items: [
					{
						title: 'Dashboard',
						url: '/homepage'
					},
				]
			},
			{
				title: 'Campaigns',
				url: '/',
				icon: Frame,
				isActive: false,
				items: [
					{
						title: 'Dungeon Master',
						url: '/campaign'
					},
					{
						title: 'Campaign Player',
						url: '/play/player'
					}
				]
			},
			{
				title: 'Characters',
				url: '/character',
				icon: Users,
				isActive: false,
				items: [
					{
						title: 'Character Manage',
						url: '/character'
					},
					{
						title: 'Create New Character',
						url: '/character/create'
					}
				]
			},
			{
				title: 'Wiki',
				url: '/wiki',
				icon: Library,
				items: [
					{
						title: 'My Wikis',
						url: '/wiki'
					},
					
				]
			},
			{
				title: 'Settings',
				url: '/account',
				icon: Settings,
				items: [
					{
						title: 'Account',
						url: '/account'
					},
					{
						title: 'Invites',
						url: '/account/invites'
					}
				]
			},
			{
				title: 'Feedback',
				url: '#',
				icon: MessageSquareCode,
				items: [
					{
						title: 'Feedback Form',
						url: 'https://docs.google.com/forms/d/1ugGhA-rDgJ-2aKmWFmoYmulu-8P_UKze9DAXVcR3OTw/edit'
					}
				]
			}
		],
		campaigns: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: Frame
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPie
			}
		]
	};
import NavMain from '$lib/components/nav-main.svelte';
import NavProjects from '$lib/components/nav-projects.svelte';
import NavUser from '$lib/components/nav-user.svelte';
import TeamSwitcher from '$lib/components/team-switcher.svelte';
import * as Sidebar from '$lib/components/ui/sidebar/index.js';
</script>


<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavProjects campaigns={data.campaigns} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
