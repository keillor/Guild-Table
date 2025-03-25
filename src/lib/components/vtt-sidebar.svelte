<script module>
  import { UserRound, Dices, Sparkles, ScrollText, Heart, Sword, Backpack } from 'lucide-svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import * from "@/components/ui/sidebar"

	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	let fetchedUser = null;

	async function fetchUser() {
			const { data: { user } } = await supabase.auth.getUser();
			if (user) {
					fetchedUser = user;
			}
	}

	fetchUser();

  const actions = [
			{
				title: 'Dice Roller',
				function: 'rollDice',
        icon: Dices
			},
			{
				title: 'Character',
				function: 'checkAttributes, changeAttribute',
				icon: UserRound,
			},
			{
				title: 'Skills',
				url: 'listSkills',
				icon: Sparkles,
			},
			{
				title: 'Save Throw',
				function: 'saveThrow',
				icon: BookOpen,
			},
			{
				title: 'Health',
				function: 'characterHealth',
				icon: Heart,
				notes: 'Health starts at 15 and scales'
			},
			{
				title: 'Weapons',
				function: 'listWeapons',
				icon: Sword,
			},
      {
        title: 'Features & Traits',
        function: 'listFeatures',
        icon: ScrollText,
      },
      {
        title: 'Inventory',
        function: 'listInventory',
        icon: Backpack
      }
		]
</script>

<Sidebar>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Campaign</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {actions.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
