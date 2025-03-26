import { z } from "zod";

export const campaignSchema = z.object({
    name: z.string().min(1, "Name is required"), // Name must be a non-empty string
    description: z.string().optional(), // Description is optional
    characterIds: z.array(z.string()), // Array of strings for character IDs
    mapIds: z.array(z.string()), // Array of strings for map IDs
    owner: z.string().min(1, "Owner is required"), // Owner must be a non-empty string
    users: z.array(z.string()), // Array of strings for user IDs
    invites: z.array(z.string()) // Array of strings for invite IDs
})