<script lang='ts'>
  const {spell} = $props();
</script>

<div>
  <h2 class="text-2xl font-bold mb-2">{spell.name}</h2>
  <p class="text-sm">Level {spell.level} {spell.school.name}</p>
  <p class="text-sm">Casting Time: {spell.casting_time}</p>
  <p class="text-sm">Range: {spell.range}</p>
  <p class="text-sm">Duration: {spell.duration}</p>
  <p class="text-sm">Concentration: {spell.concentration ? 'Yes' : 'No'}</p>
  <p class="text-sm">Ritual: {spell.ritual ? 'Yes' : 'No'}</p>

  <div class="mt-4">
    <h3 class="text-lg font-semibold">Description</h3>
    {#each spell.desc as line}
      <p class="text-sm">{line}</p>
    {/each}
  </div>

  {#if spell.higher_level && spell.higher_level.length > 0}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">At Higher Levels</h3>
      {#each spell.higher_level as line}
        <p class="text-sm">{line}</p>
      {/each}
    </div>
  {/if}

  <div class="mt-4">
    <h3 class="text-lg font-semibold">Components</h3>
    <p class="text-sm">{spell.components && spell.components.join(', ')}</p>
    {#if spell.material}
      <p class="text-sm">Material: {spell.material}</p>
    {/if}
  </div>

  {#if spell.damage}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Damage</h3>
      <p class="text-sm">Type: {spell.damage.damage_type.name}</p>
      {#if spell.damage.damage_at_slot_level}
        <p class="text-sm">Damage at Slot Level:</p>
        <ul class="text-sm">
          {#each Object.entries(spell.damage.damage_at_slot_level) as [level, damage]}
            <li>Level {level}: {damage}</li>
          {/each}
        </ul>
      {/if}
      {#if spell.damage.damage_at_character_level}
        <p class="text-sm">Damage at Character Level:</p>
        <ul class="text-sm">
          {#each Object.entries(spell.damage.damage_at_character_level) as [level, damage]}
            <li>Level {level}: {damage}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}

  {#if spell.classes && spell.classes.length > 0}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Classes</h3>
      <p class="text-sm">{spell.classes.map(c => c.name).join(', ')}</p>
    </div>
  {/if}

  {#if spell.subclasses && spell.subclasses.length > 0}
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Subclasses</h3>
      <p class="text-sm">{spell.subclasses.map(s => s.name).join(', ')}</p>
    </div>
  {/if}
</div>
