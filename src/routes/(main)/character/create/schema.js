import { z } from 'zod';

export const newClassRaceSchema = z.object({
	class: z
		.string()
		.regex(/^[a-zA-Z-]+$/)
		.max(50),
	race: z
		.string()
		.regex(/^[a-zA-Z-]+$/)
		.max(50)
});

export const raceDataSchema = newClassRaceSchema.extend({
	name: z.string(),
	speed: z.number(),
	int_bonus: z.number(),
	cha_bonus: z.number(),
	con_bonus: z.number(),
	dex_bonus: z.number(),
	wis_bonus: z.number(),
	str_bonus: z.number(),
	alignment: z.string(),
	age: z.number(),
	size: z.string(),
	size_description: z.string(),
	starting_proficiencies: z.any(),
	starting_proficiency_options: z.any(),
	languages: z.any(),
	language_desc: z.string(),
	traits: z.any(),
	subrace: z.string().optional(),

	//occational occuring properties
	language_options: z.any().optional(),
	ability_bonus_options: z.any().optional()
});

export const stringInputNames = {
	name: 'name',
	race: 'race',
	subrace: 'subrace',
	class: 'class',
	speed: 'speed',
	alignment: 'alignment',
	age: 'age',
	size: 'size',
	size_description: 'size_description',
	language_desc: 'language_desc'
};

export const numberInputNames = {
	as_bonus_race: 'as_bonus_race',
	as_bonus_class: 'as_bonus_class',
	level: 'level',
	proficiency_bonus: 'proficiency_bonus',
	hit_die: 'hit_die'
};
export const listInputNames = {
	starting_proficiency_options: 'proficiencies_options',
	language_options: 'language_options',
	proficiency_choices: 'proficiencies_choices',
	starting_proficiencies: 'starting_proficiencies',
	proficiencies: 'proficiencies',
	traits: 'traits',
	languages: 'languages',
	features: 'features',
	saving_throws: 'saving_throws',
	starting_equipment: 'starting_equipment',
	spells: 'spells'
};

export const jsonListInputNames = {
	equipment: 'equipment',
	ability_bonus_options: 'ability_bonus_options'
};
