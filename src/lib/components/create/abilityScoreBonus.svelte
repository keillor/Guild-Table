<script>
	import Button from '@/components/ui/button/button.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card/index';
	const { ability_scores, form } = $props();
	const scores = [
		{
			index: 'cha',
			name: 'CHA',
			url: '/api/ability-scores/cha'
		},
		{
			index: 'con',
			name: 'CON',
			url: '/api/ability-scores/con'
		},
		{
			index: 'dex',
			name: 'DEX',
			url: '/api/ability-scores/dex'
		},
		{
			index: 'int',
			name: 'INT',
			url: '/api/ability-scores/int'
		},
		{
			index: 'str',
			name: 'STR',
			url: '/api/ability-scores/str'
		},
		{
			index: 'wis',
			name: 'WIS',
			url: '/api/ability-scores/wis'
		}
	];
	$form['int_bonus'] = 0;
	$form['cha_bonus'] = 0;
	$form['con_bonus'] = 0;
	$form['dex_bonus'] = 0;
	$form['str_bonus'] = 0;
	$form['wis_bonus'] = 0;

	ability_scores.forEach((a) => {
		$form[`${a['ability_score'].index}_bonus`] = a['bonus'];
	});

	function incrementCount(event, score) {
		event.preventDefault();
		$form[`${score.index}_bonus`] += 1;
	}
	function decrementCount(event, score) {
		event.preventDefault();
		$form[`${score.index}_bonus`] -= 1;
	}
</script>

<h2>Ability Score Bonuses</h2>
<div class="flex flex-row">
	{#each scores as score (score.index)}
		<Card.Root class="flex w-min flex-col">
			<Card.Header>
				<Label for={`${score.index}_bonus`}>{score.name}</Label>
			</Card.Header>
			<Card.Content>
				<Input
					name={`${score.index}_bonus`}
					type="number"
					bind:value={$form[`${score.index}_bonus`]}
				/>
			</Card.Content>
			<Card.Footer>
				<Button variant="outline" onclick={(event) => decrementCount(event, score)}>-</Button>
				<Button variant="outline" onclick={(event) => incrementCount(event, score)}>+</Button>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
