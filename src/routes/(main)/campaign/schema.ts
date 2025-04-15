import { z } from "zod";

export const campaignSchema = z.object({
    name: z.string().min(1, "Name is required"), // Name must be a non-empty string
    description: z.string().optional(), // Description is optional
})