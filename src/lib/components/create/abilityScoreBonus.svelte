<script>
    import Button from "@/components/ui/button/button.svelte";
    import * as Card from '$lib/components/ui/card/index';
    const {form, ability_scores} = $props();
</script>
<h2>Ability Score Bonuses</h2>
{#each ability_scores as score (score['ability_score'].index)}
    <Card.Root class='w-min'>
        <Card.Header>
            <b>{score['ability_score'].name}</b>
            <p>Bonus: <b>{score['bonus']}</b></p>
        </Card.Header>
        <Card.Footer>
            <Button variant='outline'>+</Button>
            <Button variant='outline'>-</Button>
        </Card.Footer>
    </Card.Root>
{/each}