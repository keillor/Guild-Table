<script>
	import Button from '@/components/ui/button/button.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card/index';
    import * as Select from '$lib/components/ui/select/index';
	const { bonusScores, abilityScores } = $props();
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

    let ASModifiers = $derived.by(() => {
        let modified = {};
        for (const [key, value] of Object.entries(abilityScores)) {
            modified[key] = asm_calc(value + bonusScores[key]);
        }
        return modified;
    })
    function asm_calc(ability_score) {
        return Math.floor((ability_score - 10)/2);
    }



	function incrementCount(event, score) {
		event.preventDefault();
        abilityScores[score.index] += 1;
		//$form[`${score.index}_bonus`] += 1;
	}
	function decrementCount(event, score) {
		event.preventDefault();
        abilityScores[score.index] -= 1;
		//$form[`${score.index}_bonus`] -= 1;
	}

    //const as_gen_methods = ['Standard Array', 'Point Buy', 'Custom'];
    const as_gen_methods = ['Custom Values'];
    let selectedMethod = $state('0');
</script>

<Label for="as_gen">Ability Scores Generation</Label>
<Select.Root type="single" name="as_gen" bind:value={selectedMethod} disabled>
	<Select.Trigger class="w-[180px]">
		{as_gen_methods[Number(selectedMethod)]}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each as_gen_methods as method, index}
				<Select.Item value={index} label={method}>{index}. {method}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>


<!-- {#if selectedMethod == 2}
    Feature not yet implemented. Please check back later!
{:else if selectedMethod == 1}
    Feature not yet implemented. Please check back later! -->
{#if selectedMethod == 0}
    <div class="flex flex-row overflow-auto flex-wrap">
        {#each scores as score (score.index)}
            <Card.Root class="flex w-min flex-col content-between">
                <Card.Header class='text-center font-bold'>
                    <Label for={`${score.index}_bonus`}>{score.name}</Label>
                </Card.Header>
                <Card.Content>
                    <Input
                        name={score.index}
                        type="number"
                        bind:value={abilityScores[score.index]}
                    />
					<p>{bonusScores[score.index] > -1 ? '+' : '-'}{Math.abs(bonusScores[score.index])} bonus</p>
                    <div class='border rounded-full aspect-square text-center justify-center content-center p-2'>
                        <p class=''>{ASModifiers[score.index] > -1 ? '+' : '-'}{Math.abs(ASModifiers[score.index])}</p>
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button variant="outline" onclick={(event) => decrementCount(event, score)}>-</Button>
                    <Button variant="outline" onclick={(event) => incrementCount(event, score)}>+</Button>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>
{/if}
<!-- 

 -->