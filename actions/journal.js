'use server'

import { auth } from "@clerk/nextjs/server"
import { getPixabayImage } from "./public"
import { db } from '@/lib/prisma'
import { revalidatePath } from "next/cache"
import { MOODS, getMoodById } from '@/app/lib/moods'





export async function createJournalEntry(data) {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const user = await db.user.findUnique({
      where: { clerkUserId: userId }
    })
    if (!user) throw new Error('User not found')

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
      where: { userId: user.id },
    })

    revalidatePath('/dashboard')
    revalidatePath(`/collection/${entry.collectionId || 'unorganized'}`)

    return entry
  } catch (err) {
    throw err
  }
}

export async function getJournalEntries({ collectionId, orderBy = 'desc' } = {}) {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const user = await db.user.findUnique({
      where: { clerkUserId: userId }
    })
    if (!user) throw new Error('User not found')

    const entries = await db.entry.findMany({
      where: {
        userId: user.id,
        ...(collectionId === 'unorganized'
          ? { collectionId: null }
          : collectionId
            ? { collectionId }
            : {}
        )
      },
      include: {
        collection: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: orderBy,
      }
    })

    const entriesWithMoodData = entries.map((entry) => ({
      ...entry,
      moodData: getMoodById(entry.mood),
    }))

    return {
      success: true,
      data: { entries: entriesWithMoodData },
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export async function getJournalEntry(id) {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const user = await db.user.findUnique({
      where: { clerkUserId: userId }
    })
    if (!user) throw new Error('User not found')

    const entry = await db.entry.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        collection: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    if (!entry) throw new Error('Entry not found')

    return entry
  } catch (err) {
    throw err
  }
}

export async function deleteJournalEntry(id) {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const user = await db.user.findUnique({
      where: { clerkUserId: userId }
    })
    if (!user) throw new Error('User not found')

    const entry = await db.entry.findFirst({
      where: {
        userId: user.id,
        id,
      },
    })

    if (!entry) throw new Error('Entry not found')

    await db.entry.delete({
      where: { id },
    })

    revalidatePath('/dashboard')
    return entry
  } catch (err) {
    throw err
  }
}
