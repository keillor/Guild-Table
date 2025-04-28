<script>
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.ts';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	const { data } = $props();
	let monsters = $state(data.monsters);

	function deleteMonster(id) {
		monsters = monsters.filter((monster) => monster._id !== id);
	}
</script>

<h1 class="text-3xl font-bold">Monster Management</h1>
<Button href={`/campaign/${page.params.id}/monsters/import`}>Import Monster</Button>
{#if monsters.length > 0}
	<div class="grid gap-4">
		<Accordion.Root type="multiple">
			{#each monsters as monster}
				<div class="rounded-md border p-4 shadow-md">
					<Accordion.Item value={monster.index}>
						<Accordion.Trigger>
							<span class="flex flex-row items-center gap-2">
								<Avatar.Root class="size-10">
									<Avatar.Image
										src={`https://www.dnd5eapi.co${monster.image}`}
										alt={monster.name}
									/>
									<Avatar.Fallback>{monster.name[0]}</Avatar.Fallback>
								</Avatar.Root>
								<h2 class="text-xl font-bold underline">{monster.name}</h2>
							</span>
						</Accordion.Trigger>
						<Accordion.Content>
							<span class="flex flex-row">
								<form
									method="POST"
									action="?/deleteMonster"
									use:enhance={({ formData }) => {
										return async ({ result }) => {
											const response = await result;
											if (response.type === 'success') {
												deleteMonster(monster._id)
												toast.success('Monster deleted.');
											} else {
												toast.error('Failed to delete monster.');
											}
										};
									}}
								>
									<Button variant="outline" type='submit'>Delete</Button>
									<input hidden name="monsterId" value={monster._id} />
								</form>
							</span>
							<p><strong>Size:</strong> {monster.size}</p>
							<p><strong>Type:</strong> {monster.type}</p>
							<p><strong>Alignment:</strong> {monster.alignment}</p>
							<p>
								<strong>Armor Class:</strong>
								{#each monster.armor_class as ac}{ac.value} ({ac.type}){/each}
							</p>
							<p><strong>Hit Points:</strong> {monster.hit_points} ({monster.hit_dice})</p>
							<p><strong>Speed:</strong> Walk: {monster.speed.walk}, Swim: {monster.speed.swim}</p>
							<p><strong>Abilities:</strong></p>
							<ul>
								<li><strong>STR:</strong> {monster.strength}</li>
								<li><strong>DEX:</strong> {monster.dexterity}</li>
								<li><strong>CON:</strong> {monster.constitution}</li>
								<li><strong>INT:</strong> {monster.intelligence}</li>
								<li><strong>WIS:</strong> {monster.wisdom}</li>
								<li><strong>CHA:</strong> {monster.charisma}</li>
							</ul>
							<p><strong>Proficiencies:</strong></p>
							<ul>
								{#each monster.proficiencies as proficiency}
									<li>{proficiency.proficiency.name}: +{proficiency.value}</li>
								{/each}
							</ul>
							<p>
								<strong>Damage Vulnerabilities:</strong>
								{monster.damage_vulnerabilities.join(', ') || 'None'}
							</p>
							<p>
								<strong>Damage Resistances:</strong>
								{monster.damage_resistances.join(', ') || 'None'}
							</p>
							<p>
								<strong>Damage Immunities:</strong>
								{monster.damage_immunities.join(', ') || 'None'}
							</p>
							<p>
								<strong>Condition Immunities:</strong>
								{monster.condition_immunities.join(', ') || 'None'}
							</p>
							<p>
								<strong>Senses:</strong> Darkvision: {monster.senses.darkvision}, Passive
								Perception: {monster.senses.passive_perception}
							</p>
							<p><strong>Languages:</strong> {monster.languages}</p>
							<p>
								<strong>Challenge Rating:</strong>
								{monster.challenge_rating} (XP: {monster.xp})
							</p>
							<p><strong>Special Abilities:</strong></p>
							<ul>
								{#each monster.special_abilities as ability}
									<li><strong>{ability.name}:</strong> {ability.desc}</li>
								{/each}
							</ul>
							<p><strong>Actions:</strong></p>
							<ul>
								{#each monster.actions as action}
									<li><strong>{action.name}:</strong> {action.desc}</li>
								{/each}
							</ul>
							<p><strong>Legendary Actions:</strong></p>
							<ul>
								{#each monster.legendary_actions as legendary}
									<li><strong>{legendary.name}:</strong> {legendary.desc}</li>
								{/each}
							</ul>
						</Accordion.Content>
					</Accordion.Item>
				</div>
			{/each}
		</Accordion.Root>
	</div>
{:else}
	<p>You don't have any monsters imported yet...</p>
{/if}
