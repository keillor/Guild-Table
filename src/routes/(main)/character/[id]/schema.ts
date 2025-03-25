import { z } from "zod"; 

export const characterSchema = z.object({
    name: z.string().min(1).max(50),
    race: z.string().min(1).max(50),
    class: z.string().min(1).max(50),
    speed: z.string().min(1).max(50),
    age: z.string().min(1).max(50),
    size: z.string().min(1).max(50),
    size_description: z.string().min(1).max(2000),
    language_description: z.string().max(2000).optional(),
    spellcasting_ability: z.enum(['cha', 'con', 'dex', 'str', 'int', 'wis']).nullable().optional(),
    
    as_bonus: z.number(),
    level: z.number(),
    proficiency_bonus: z.number(),
    spellcasting_level: z.number(),
    hit_die: z.number().min(4).max(100).default(4),

    proficiencies: z.array(z.string()),
    languages: z.array(z.string()),
    traits: z.array(z.string()),
    features: z.array(z.string()),
    saving_throws: z.array(z.string()),
    equipment: z.array(
        z.object({
          name: z.string(),
          index: z.string(),
          count: z.number().min(1),
          weight: z.number(),
          cost: z.object({
            quantity: z.number(),
            unit: z.string()
          })
        })
      ).min(0),    

      ability_scores: z.object({
        cha: z.number().int(),
        con: z.number().int(),
        dex: z.number().int(),
        int: z.number().int(),
        str: z.number().int(),
        wis: z.number().int(),
      }),
    spells: z.record(z.any()).nullable(),
    as_bonus_mod: z.object({
        cha: z.number().int(),
        con: z.number().int(),
        dex: z.number().int(),
        int: z.number().int(),
        str: z.number().int(),
        wis: z.number().int(),
      }),
})

export type FormSchema = typeof characterSchema;