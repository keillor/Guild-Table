import { z } from 'zod';

export const newClassSchema = z.object({
	class: z
		.string()
		.regex(/^[a-zA-Z-]+$/)
		.max(50),
	race: z
		.string()
		.regex(/^[a-zA-Z-]+$/)
		.max(50)
});

export const raceDataSchema = newClassSchema.extend({
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
