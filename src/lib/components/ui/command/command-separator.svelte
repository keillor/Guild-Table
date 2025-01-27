<script>
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let { ref = $bindable(null), class: className, ...restProps } = $props();
</script>

<CommandPrimitive.Separator class={cn('-mx-1 h-px bg-border', className)} bind:ref {...restProps} />
