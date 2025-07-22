import z from "zod";

export const journalSchema = z.object({
    title: z.string().min(1, 'Title is Required'),
    content: z.string().min(1, 'Content is Required'),
    mood: z.string().min(1, 'Mood is Required'),
    collectionId: z.string().optional(),
})