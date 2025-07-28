import { getJournalEntry } from '@/actions/journal'
import { getMoodById } from '@/app/lib/moods'
import { format } from 'date-fns'
import react from 'react'
import EditButton from './_components/edit-button'
import DeleteDialog from './_components/delete-dialog'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'


const JournalEntryPage = async ({ params }) => {
    const { id } = params
    const entry= await getJournalEntry(id)
    const mood = getMoodById(entry.mood)

    return(
        <>
            <div className='mb-4'>
                <Link href='/entries' className='text-sm text-purple-500 hover:text-purple-700'>
                    Back to Entries
                </Link>
            </div>
            {entry.moodImageUrl && (
                <div className='relative h-48 md:h-48 w-full'>
                    <Image
                    src={entry.moodImageUrl}
                    alt='Mood Visualization'
                    className='object-cover'
                    fill
                    priority/>
                </div>
            )}

            <div className='p-6 space-y-6'>
                <div className='space-y-4'>
                    <div className='flex flex-wrap items-center justify-between gap-4'>
                        <div className='space-y-1'>
                            <h1 className='text-5xl font-bold gradient-title'>{entry.title}</h1>
                            <p className='text-purple-500'>Created {format(new Date(entry.createdAt), 'PPP')}</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <EditButton entryId={id} />
                            <DeleteDialog entryId={id} />
                        </div>
                    </div>

                    <div>
                        {entry.collection && (
                            <Link href={`/collection/${entry.collection.id}`}>
                                <Badge>Collection: {entry.collection.name} </Badge>
                            </Link>
                        )}

                        <Badge variant='outline'></Badge>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JournalEntryPage