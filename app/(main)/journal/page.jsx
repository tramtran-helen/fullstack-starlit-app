import { getJournalEntries } from '@/actions/journal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const EntriesPage = async () => {
  const router = useRouter();
  const entriesData = await getJournalEntries()
  const entries = entriesData?.data?.entries || []

  // Sort newest first
  const sortedEntries = entries.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <div className='px-6 py-8 space-y-6'>
      <div className='mb-4'>
        <Link href='/dashboard' className='text-sm text-purple-500 hover:text-purple-700'>
          Back to Dashboard
        </Link>
      </div>
      <h1 className='text-3xl font-bold text-purple-900'>All Journal Entries</h1>

      {sortedEntries.length === 0 ? (
        <p className='text-gray-500'>No entries found.</p>
      ) : (
        <ul className='space-y-4'>
          {sortedEntries.map(entry => (
            <li key={entry.id}>
              <Link href={`/entries/${entry.id}`}>
                <div className='cursor-pointer rounded-xl bg-purple-100 p-4 hover:bg-purple-200 transition'>
                  <h2 className='font-semibold'>{entry.title}</h2>
                  <p className='text-gray-600 text-sm'>{entry.content?.slice(0, 100)}...</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EntriesPage
