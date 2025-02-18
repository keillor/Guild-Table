<script module>
	import AudioWaveform from 'lucide-svelte/icons/audio-waveform';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Bot from 'lucide-svelte/icons/bot';
	import ChartPie from 'lucide-svelte/icons/chart-pie';
	import Command from 'lucide-svelte/icons/command';
	import Frame from 'lucide-svelte/icons/frame';
	import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end';
	import Map from 'lucide-svelte/icons/map';
	import Settings2 from 'lucide-svelte/icons/settings-2';
	import MessageSquareCode from 'lucide-svelte/icons/message-square-code';
	import { Users } from 'lucide-svelte';

	// This is sample data.
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
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
				title: 'Campaigns',
				url: '/',
				icon: Frame,
				isActive: false,
				items: [
					{
						title: 'Dungeon Master',
						url: '/play/dm'
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
				title: 'Documentation',
				url: '#',
				icon: BookOpen,
				items: [
					{
						title: 'Get Started',
						url: '#'
					},
					{
						title: 'Tutorials',
						url: '#'
					},
				]
			},
			{
				title: 'Settings',
				url: '#',
				icon: Settings2,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Team',
						url: '#'
					},
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
</script>

<script>
	import NavMain from '$lib/components/nav-main.svelte';
	import NavProjects from '$lib/components/nav-projects.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import TeamSwitcher from '$lib/components/team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	let { ref = $bindable(null), collapsible = 'icon', ...restProps } = $props();
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
