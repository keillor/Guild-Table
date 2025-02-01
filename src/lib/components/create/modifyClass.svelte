<script>
	import ClassOptionSelect from './ClassOptionSelect.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import EquipmentOptionSelect from './EquipmentOptionSelect.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import ComboSelect from './ComboSelect.svelte';
	import Badge from '../ui/badge/badge.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import EquipmentSelect from './EquipmentSelect.svelte';

	const { classData, levelData, equipment,form, proficiencies, features } = $props();

	$form['hit_die'] = classData['hit_die'];

	//form['hit_die'] = 0

	let choices = [];
	for (let key in classData) {
		if (key.endsWith('choices')) {
			choices.push({
				data: classData[key],
				displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
				key: key
			});
		}
	}

	let options = [];
	for (let key in classData) {
		if (key.endsWith('options')) {
			options.push({
				data: classData[key],
				displayValue: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
				key: key
			});
		}
	}
</script>

<Card.Root>
	<Card.Header>
		<h2 class="text-xl font-bold">Class Defaults</h2>
	</Card.Header>
	<Card.Content>
		<Label for="name">Class</Label>
		<Input name="name" value={classData.name} type="text" disabled />

		<h3>Proficiency Bonus: {levelData.prof_bonus}</h3>
		<h3>Ability Score Bonus: {levelData.ability_score_bonuses}</h3>

		<Label for='hit_die'>Hit Die</Label>
		<Select.Root name='hit_die' bind:value={$form['hit_die']} type='single'>
			<Select.Trigger class="w-[180px]">
				{$form['hit_die']}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each [4,6,8,10,12,20] as die}
						<Select.Item value={die} label={die}>{die}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>

		<ComboSelect
			formInputName='features'
			formDisplayName='Features'
			{form}
			things={features}
			raceData={levelData}/>

		<ComboSelect
			formInputName="proficiencies"
			formDisplayName="Proficiencies"
			{form}
			things={proficiencies}
			raceData={classData}
		/>

		<ComboSelect 
			formInputName='saving_throws'
			formDisplayName='Saving Throws'
			{form}
			things={{results:[
				{
				  "index": "cha",
				  "name": "CHA",
				  "url": "/api/ability-scores/cha"
				},
				{
				  "index": "con",
				  "name": "CON",
				  "url": "/api/ability-scores/con"
				},
				{
				  "index": "dex",
				  "name": "DEX",
				  "url": "/api/ability-scores/dex"
				},
				{
				  "index": "int",
				  "name": "INT",
				  "url": "/api/ability-scores/int"
				},
				{
				  "index": "str",
				  "name": "STR",
				  "url": "/api/ability-scores/str"
				},
				{
				  "index": "wis",
				  "name": "WIS",
				  "url": "/api/ability-scores/wis"
				}
			  ]}}
			raceData={classData}/>

		<EquipmentSelect allThings={equipment} {form} formDisplayName='Starting Equipment' formInputName='starting_equipment' classData={classData}/>

	</Card.Content>
</Card.Root>

{#if choices.length > 0}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Class Choices</h2>
		</Card.Header>
		<Card.Content>
			{#each choices as thing (thing.key)}
				{#each thing.data as option, index}
					<ClassOptionSelect
						formInputName={option.desc}
						formDisplayName={option.desc}
						{form}
						choices={option}
						classIndex={index}
					/>
				{/each}
			{/each}
		</Card.Content>
	</Card.Root>
{/if}


{#if options.length > 0}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Class Options</h2>
		</Card.Header>
		<Card.Content>
			{#each options as thing (thing.key)}
				{#each thing.data as option, equipIndex}
					<EquipmentOptionSelect
						formInputName={option.desc}
						formDisplayName={option.desc}
						form={form}
						choices={option}
						equipIndex={equipIndex}
					/>
				{/each}
			{/each}
		</Card.Content>
	</Card.Root>
{/if}

{#if classData.spellcasting !== null}
	<Card.Root>
		<Card.Header>
			<h2 class="text-xl font-bold">Spellcasting</h2>
		</Card.Header>
		<Card.Content>
			<h3>Casting Level: {classData.spellcasting.level}</h3>
			<h3>Spell Casting Ability: {classData.spellcasting.spellcasting_ability.name}</h3>
			
			{#each classData.spellcasting.info as info}
				<h4 class='text-lg font-bold'>{info.name}</h4>
				<p>{info.desc}</p>
				
			{/each}

			
		</Card.Content>
		<Card.Footer>

		</Card.Footer>
	</Card.Root>
	
{/if}
