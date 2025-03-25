<script lang='ts'>
import Milkdown from "$lib/components/markdown/Milkdown.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import type { Wiki } from "$lib/models/wikipage";
	const myWiki : Wiki = {text: "# A header! \n ## Slightly Smaller Header  \n ### Even smaller header \nHere is the *markdown* Supplied. \n> A quotation \n ~~I want Coffee~~", user: 'long long user id'};
	let milkdownRef;
	function handleSave() {
		const markdown = milkdownRef.saveMarkdown()
		console.log("Markdown saved:", markdown);
	}
</script>


<Milkdown bind:this={milkdownRef} markdown={myWiki}/>
<Button onclick={handleSave}>New Button</Button>
