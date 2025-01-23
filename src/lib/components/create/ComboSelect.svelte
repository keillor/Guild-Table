<script>
    //big symbols
	import { CircleX } from "lucide-svelte";
	import { Badge } from "../ui/badge";
    
    //Combobox imports
    import Check from "lucide-svelte/icons/check";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";
    //combobox end

    //shadcn components
    import { Input } from "$lib/components/ui/input/index.js";
    import Label from "@/components/ui/label/label.svelte";
    import { useId } from "bits-ui";

    //data
    const {formInputName, formDisplayName, form, things, raceData} = $props();
    console.log(things);
    const allThings = things.results.map((t) => {
      return t.name;
    });
    let open = $state(false);
    const triggerId = useId();

    function closeAndFocusTrigger() {
        open = false;
        tick().then(() => {
            document.getElementById(triggerId)?.focus();
        });
    }

</script>
<Label>{formDisplayName}</Label>
<Popover.Root bind:open>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button
          variant="outline"
          class="w-[200px] justify-between"
          {...props}
          role="combobox"
          aria-expanded={open}
        >
          {`Select a ${formDisplayName}`}
          <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-[200px] p-0">
      <Command.Root>
        <Command.Input placeholder="Search framework..." />
        <Command.List>
          <Command.Empty>{`No ${formDisplayName} found.`}</Command.Empty>
          <Command.Group>
            {#each allThings as item (item)}
              <Command.Item
                value={item}
                onSelect={() => {
                  const exists = $form.languages.some((i) => i === item);
                    if (!exists) {
                      $form.languages = [...$form.languages, item];
                    } else {
                      $form.languages = $form.languages.filter((l) => l !== item);
                    }
                  closeAndFocusTrigger();
                }}
              >
              <Check
                class={cn($form.languages.some((l) => l === item) || "text-transparent")}
              />
                {item}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
  <div class='flex flex-row gap-2'>
    {#each $form[`${formInputName}`] as item (item)}
        <Badge class='flex flex-row content-between gap-1 text-white w-min' onclick={(event) => {
            event.preventDefault();
            $form.languages = $form.languages.filter((l) => l !== item);
        }}>
            {item}
        </Badge>
    {/each}
</div>
<input hidden bind:value={$form.languages} name='languages'>