import { z } from 'zod';

export const newRaceSchema = z.object({
	race: z.string().min(2).max(50),
	subrace: z.string().min(2).max(50).optional()
});

export const newClassSchema = newRaceSchema.extend({
	class: z.string().min(2).max(50),
	subclass: z.string().min(2).max(50).optional()
});
