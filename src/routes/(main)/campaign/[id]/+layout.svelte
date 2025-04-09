<script>
	import CampaignSettingsSidebar from "$lib/components/campaign/CampaignSettingsSidebar.svelte";

    const { children } = $props();
</script>


<CampaignSettingsSidebar/>
{@render children()}