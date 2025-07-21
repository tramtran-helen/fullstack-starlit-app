'use server'
import { auth } from "@clerk/nextjs/server"
import { getPixabayImage } from "./public"





export async function createJournalEntry(data) {
    try {
        const { userId } = await auth()
        if (!userId) throw newError('Unauthorized')

        const user = await db.user.findUnique({
            where: { clerkUserId: userId}
        })

        if (!user) {
            throw new Error('User not found')
        }

        const mood = MOODS[data.mood.toUpperCase()]
        if (!mood) throw new Error('Invalid Mood')

        const moodImageUrl = await getPixabayImage(data.moodQuery)

        const entry = await db.entry.create({
            data: {
                title: data.title,
                content: data.content,
                mood: mood.id,
                moodScore: mood.score,
                moodImageUrl,
                userId: user.id,
                collectionId: data.collectionId || null,
            }
        })

        await db.draft.deleteMany({
            where: { useId: user.id },
        })

        revalidatePath('/dashboard')
        return entry
    } catch(err) {
        throw new Error(err.message)
    }
}