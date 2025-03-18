<script lang='ts'>
	import { Badge } from "$lib/components/ui/badge/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Info, Trash } from "lucide-svelte";
	import GenericAsyncPopover from "./GenericAsyncPopover.svelte";
    const { formData, key } = $props();
    const removeItem = (item: string) => {
        $formData[key] = $formData[key].filter((i: string) => i != item);
    }
</script>

<div class='flex flex-row gap-1'>
    {#each $formData[key] as item}
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Badge class='flex h-min flex-row content-between gap-1 text-white rounded-lg'>{item}</Badge>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>Options</DropdownMenu.GroupHeading>
            <DropdownMenu.Separator />
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>
                    <Info class='mr-2 size-4'/>
                    <span>Details</span>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                    <GenericAsyncPopover {item} type={key}/>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            <DropdownMenu.Item onclick={() => removeItem(item)}>
                <Trash class='mr-2 size-4'/>
                <span>Delete</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    {/each}
</div>