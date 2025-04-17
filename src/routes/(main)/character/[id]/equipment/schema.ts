import { z } from "zod";

export const singleEquipment = z.object({
    name: z.string(),
    index: z.string(),
    count: z.number(),
    weight: z.number(),
    cost: z.object({
        quantity: z.number(),
        unit: z.enum(['cp', 'sp', 'gp', 'pp'])
    }) 
})

export const equipmentSchema = z.object({
    equipment: z.array(singleEquipment)
});
