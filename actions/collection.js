'use server'

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"





export async function createCollection(data) {
    try {
        const { userId } = await auth()
        if (!userId) throw new Error('Unauthorized')

        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        })
        if (!user) {
            throw new Error('User not found')
        }

        const collection = await db.collection.create({
            data: {
                name: data.name,
                description: data.description,
                userId: user.id,
            }
        })

        revalidatePath('/dashboard')
        return collection
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getCollections() {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const user = await db.user.findUnique({
        where: { clerkUserId: userId }
    })
    if (!user) {
        throw new Error('User not found')
    }

    const collections = await db.collection.findMany({
        where: {
            userId: user.id,
        },
        orderBy: { createdAt: 'desc' },
    })

    return collections
}

export async function getCollection(collectionId) {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const user = await db.user.findUnique({
        where: { clerkUserId: userId }
    })
    if (!user) {
        throw new Error('User not found')
    }

    const collections = await db.collection.findUnique({
        where: {
            userId: user.id,
            id: collectionId,
        },
    })

    return collections
}

export async function deleteCollection(collectionId) {
    try {
        const { userId } = await auth()
        if (!userId) throw new Error('Unauthorized')

        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        })
        if (!user) {
            throw new Error('User not found')
        }

        const collection = await db.collection.findUnique({
            where: { id: collectionId },
        })
        if (!collection || collection.userId !== user.id) {
            throw new Error('Collection not found or unauthorized')
        }

        await db.collection.delete({
            where: { id: collectionId },
        })

        revalidatePath('/dashboard')
        return { success: true }
    } catch (err) {
        throw new Error(err.message)
    }
}
