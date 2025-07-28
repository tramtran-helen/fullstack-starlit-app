import { getJournalEntry } from '@/actions/journal'
import { getMoodById } from '@/app/lib/moods'
import { format } from 'date-fns'
import EditButton from './_components/edit-button'
import DeleteDialog from './_components/delete-dialog'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'





const JournalEntryPage = async ({ params }) => {
  const { id } = params
  const entry = await getJournalEntry(id)
  const mood = getMoodById(entry.mood)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
       <div className="mb-4">
        <Link href={`/collection/${entry.collectionId || 'unorganized'}`} className="text-l text-purple-300 hover:text-purple-100 transition">
          ✪ Back to Entries
        </Link>
      </div>

      {entry.moodImageUrl && (
        <div className="relative w-full h-56 md:h-72 lg:h-96 rounded-xl overflow-hidden shadow-md mb-8">
          <Image
            src={entry.moodImageUrl}
            alt="Mood Visualization"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      )}

      <div className="bg-purple-900 bg-opacity-20 rounded-2xl p-8 shadow-lg border border-purple-700/30 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-100 gradient-title drop-shadow-lg">
              {entry.title}
            </h1>
            <p className="mt-1 text-purple-200 text-sm md:text-base">
              Created {format(new Date(entry.createdAt), 'PPP')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <EditButton entryId={id} />
            <DeleteDialog entryId={id} />
          </div>
        </header>

        {entry.collection && (
          <Link href={`/collection/${entry.collection.id}`}>
            <Badge className="bg-purple-500 text-white hover:bg-purple-600 transition cursor-pointer">
              Collection: {entry.collection.name}
            </Badge>
          </Link>
        )}

        <article
          className="prose prose-purple max-w-none text-purple-100 pt-4"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
      </div>
    </div>
  )
}

export default JournalEntryPage
