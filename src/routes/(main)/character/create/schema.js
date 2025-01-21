import { z } from 'zod';

export const newClassSchema = z.object({
	class: z.string().min(2).max(50),
	race: z.string().min(2).max(50)
});

export const raceDataSchema = newClassSchema.extend({
	name: z.string(),
	speed: z.number(),
	ability_bonus: z.any(),
	alignment: z.string(),
	age: z.number(),
	size: z.string(),
	size_description: z.string(),
	starting_proficiencies: z.any(),
	starting_proficiency_options: z.any(),
	languages: z.any(),
	language_description: z.string(),
	traits: z.any(),
	subrace: z.string().optional(),

	//occational occuring properties
	language_options: z.any().optional(),
	ability_bonus_options: z.any().optional()
});
