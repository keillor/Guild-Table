<script>
	import Button from '@/components/ui/button/button.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card/index';
    import * as Select from '$lib/components/ui/select/index';
	//const { form } = $props();
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
	/* $form['int_bonus'] = 0;
	$form['cha_bonus'] = 0;
	$form['con_bonus'] = 0;
	$form['dex_bonus'] = 0;
	$form['str_bonus'] = 0;
	$form['wis_bonus'] = 0; */

    let AbilityScores = $state({
        int: 0,
        cha: 0,
        con: 0,
        dex: 0,
        str: 0,
        wis: 0,
    });

    let ASModifiers = $derived.by(() => {
        let modified = {};
        for (const [key, value] of Object.entries(AbilityScores)) {
            modified[key] = asm_calc(value);
        }
        console.log(modified);
        return modified;
    })
    function asm_calc(ability_score) {
        return Math.floor((ability_score - 10)/2);
    }



	function incrementCount(event, score) {
		event.preventDefault();
        AbilityScores[score.index] += 1;
		//$form[`${score.index}_bonus`] += 1;
	}
	function decrementCount(event, score) {
		event.preventDefault();
        AbilityScores[score.index] -= 1;
		//$form[`${score.index}_bonus`] -= 1;
	}

    const as_gen_methods = ['Standard Array', 'Point Buy', 'Custom'];
    let selectedMethod = $state('2');
</script>

<Label for="as_gen">Ability Scores Generation</Label>
<Select.Root type="single" name="as_gen" bind:value={selectedMethod}>
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


{#if selectedMethod == 0}
    Feature not yet implemented. Please check back later!
{:else if selectedMethod == 1}
    Feature not yet implemented. Please check back later!
{:else if selectedMethod == 2}
    <div class="flex flex-row">
        {#each scores as score (score.index)}
            <Card.Root class="flex w-min flex-col">
                <Card.Header>
                    <Label for={`${score.index}_bonus`}>{score.name}</Label>
                </Card.Header>
                <Card.Content>
                    <Input
                        name={score.index}
                        type="number"
                        bind:value={AbilityScores[score.index]}
                    />
                    <div class='border rounded-full aspect-square text-center justify-center content-center'>
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