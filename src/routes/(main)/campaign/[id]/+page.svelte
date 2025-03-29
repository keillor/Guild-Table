<script lang='ts'>
	import type { Campaign } from "$lib/models/Campaign";

    let campaignInstance: Campaign  = {
        characterIds: [],
        description: '',
        invites: [],
        mapIds: [],
        name: '',
        owner: '',
        users: []
    }
</script>

<h1 class='text-3xl font-bold'>
    Campaign: {campaignInstance.name}
</h1>