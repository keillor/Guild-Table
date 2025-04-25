import { z } from "zod";

export const wikiSchema = z.object({
    title: z.string(),
    text: z.string(),
    owner: z.string(),
    public: z.boolean(),
    campaign: z.string(),
    _id: z.string()
})