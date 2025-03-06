<script lang="ts">
	import SuperDebug, { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
  import type { CharacterTypeTS } from '$lib/models/character';
  
  import * as Card from "$lib/components/ui/card/index.js";
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { characterSchema, type FormSchema } from './schema';
	import { toast } from 'svelte-sonner';
  import { Trash } from 'lucide-svelte/icons';
	import BasicChipEach from '$lib/components/create/BasicChipEach.svelte';

	const data = $props();
	let character: CharacterTypeTS = data.data.character;
	const serverFormType: SuperValidated<Infer<FormSchema>> = data.data.form;



	const form = superForm(defaults(character, zodClient(characterSchema)), {
		validators: zodClient(characterSchema),
		dataType: 'json',
    resetForm: false,
    onUpdated: ({ form: f }) => {
			if (f.valid) {
        toast.success("Character saved.");
			} else {
        toast.error('Character not saved. Please review errors.')
        console.log(f.errors);
      }
		},
	});

	const { form: formData, enhance, restore } = form;
  const all_dice = [4,6,8,10,12,20,100];
  const as_names = ['cha', 'con','dex', 'int', 'str', 'wis'];
  const savingThrowsList = ['cha', 'con','dex', 'int', 'str', 'wis'];
</script>


<Card.Root>
  <Card.Header>
    <h1 class='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5x'>
      Character Edit: <b class='underline'>{character.name}</b>
    </h1>
  </Card.Header>
  <Card.Content>
    <form method="POST" use:enhance>
      <Form.Field {form} name="name">
        <Form.Control>
          <Form.Label>Character Name</Form.Label>
          <Input bind:value={$formData.name} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="race">
        <Form.Control>
          <Form.Label>Character Race</Form.Label>
          <Input disabled bind:value={$formData.race} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="class">
        <Form.Control>
          <Form.Label>Character Class</Form.Label>
          <Input disabled bind:value={$formData.class} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="speed">
        <Form.Control>
          <Form.Label>Character Speed</Form.Label>
          <Input bind:value={$formData.speed} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="age">
        <Form.Control>
          <Form.Label>Character Age</Form.Label>
          <Input bind:value={$formData.age} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="size">
        <Form.Control>
          <Form.Label>Character Size</Form.Label>
          <Input bind:value={$formData.size} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="size_description">
        <Form.Control>
          <Form.Label>Character Size Description</Form.Label>
          <Input bind:value={$formData.size_description} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="language_description">
        <Form.Control>
          <Form.Label>Character Language Description</Form.Label>
          <Input bind:value={$formData.language_description} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="spellcasting_ability">
        <Form.Control>
          <Form.Label>Spellcasting Ability</Form.Label>
          <Select.Root type="single" bind:value={$formData.spellcasting_ability}>
            <Select.Trigger class="w-[180px]">{$formData.spellcasting_ability}</Select.Trigger>
            <Select.Content>
              {#each as_names as as_name}
                <Select.Item value={as_name}>{as_name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="as_bonus">
        <Form.Control>
          <Form.Label>AS Bonus</Form.Label>
          <Input bind:value={$formData.as_bonus} type="number" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="level">
        <Form.Control>
          <Form.Label>Level</Form.Label>
          <Input bind:value={$formData.level} type="number" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="proficiency_bonus">
        <Form.Control>
          <Form.Label>Proficiency Bonus</Form.Label>
          <Input bind:value={$formData.proficiency_bonus} type="number" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="spellcasting_level">
        <Form.Control>
          <Form.Label>Spellcasting Level</Form.Label>
          <Input bind:value={$formData.spellcasting_level} type="number" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    
      <Form.Field {form} name="hit_die">
        <Form.Control>
          <Form.Label>Hit Die</Form.Label>
          <Select.Root type="single" value={Number($formData.hit_die)} onValueChange={(v) => {
            $formData.hit_die = Number(v);
          }}>
            <Select.Trigger class="w-[180px]">d{$formData.hit_die}</Select.Trigger>
            <Select.Content>
              {#each all_dice as die}
                <Select.Item value={die}>d{die}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>


      

      <Form.Field {form} name="proficiencies">
        <Form.Control>
          <Form.Label>Proficiencies</Form.Label>
          <Select.Root type="multiple" bind:value={$formData.proficiencies}>
            <Select.Trigger class="w-[180px]">Proficiencies</Select.Trigger>
            <Select.Content>
              {#each data.data.proficiencies.results as proficiency}
                <Select.Item value={proficiency.index}>{proficiency.name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <BasicChipEach list={$formData.proficiencies} />
      
      <Form.Field {form} name="languages">
        <Form.Control>
          <Form.Label>Languages</Form.Label>
          <Select.Root type="multiple" bind:value={$formData.languages}>
            <Select.Trigger class="w-[180px]">Languages</Select.Trigger>
            <Select.Content>
              {#each data.data.languages.results as language}
                <Select.Item value={language.index}>{language.name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <BasicChipEach list={$formData.languages} />
      
      <Form.Field {form} name="traits">
        <Form.Control>
          <Form.Label>Traits</Form.Label>
          <Select.Root type="multiple" bind:value={$formData.traits}>
            <Select.Trigger class="w-[180px]">Traits</Select.Trigger>
            <Select.Content>
              {#each data.data.traits.results as trait}
                <Select.Item value={trait.index}>{trait.name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <BasicChipEach list={$formData.traits} />
      
      <Form.Field {form} name="features">
        <Form.Control>
          <Form.Label>Features</Form.Label>
          <Select.Root type="multiple" bind:value={$formData.features}>
            <Select.Trigger class="w-[180px]">Features</Select.Trigger>
            <Select.Content>
              {#each data.data.features.results as feature}
                <Select.Item value={feature.index}>{feature.name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <BasicChipEach list={$formData.features} />
      
      <Form.Field {form} name="saving_throws">
        <Form.Control>
          <Form.Label>Saving Throws</Form.Label>
          <Select.Root type="multiple" bind:value={$formData.saving_throws}>
            <Select.Trigger class="w-[180px]">Saving Throws</Select.Trigger>
            <Select.Content>
              {#each savingThrowsList as saving_throw}
                <Select.Item value={saving_throw}>{saving_throw}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <BasicChipEach list={$formData.saving_throws} />
      
      <Form.Field {form} name="equipment">
        <Form.Control>
          <Form.Label>Equipment</Form.Label>
          {#each $formData.equipment as _, index}
            <div class="flex items-center space-x-2">
              <Input bind:value={$formData.equipment[index].name} />
              <Input bind:value={$formData.equipment[index].count} type="number" class='w-24'/>
              <Button variant='outline' class=''>
                <Trash class="size-4"/>
              </Button>
            </div>
          {/each}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      
      
      
      <Form.Button>Submit</Form.Button>
    </form>
  </Card.Content>
  <Card.Footer>
    <h3 class='font-bold'>Relevant Links:</h3>
    <a class='underline' href={`/character/create/scores/${character._id}`}>Edit Ability Scores</a>
  </Card.Footer>
</Card.Root>

<SuperDebug data={$formData} />


