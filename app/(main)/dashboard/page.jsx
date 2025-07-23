import { getCollections } from '@/actions/collection'
import { getJournalEntries } from '@/actions/journal'
import Collections from './_components/collections'
import react from 'react'
import MoodAnalytics from './_components/mood-analytics'





const Dashboard = async () => {
  const collections = await getCollections()
  const entriesData = await getJournalEntries()

  // Safely get entries array or fallback to empty array
  const entries = entriesData?.data?.entries || []

  // Group entries by collectionId, default to 'unorganized'
  const entriesByCollection = entries.reduce((acc, entry) => {
    const collectionId = entry.collectionId || 'unorganized'
    if (!acc[collectionId]) {
      acc[collectionId] = []
    }
    acc[collectionId].push(entry)
    return acc
  }, {})

  return (
    <div className='px-4 py-8 space-y-8'>
      <section className='space-y-4'><MoodAnalytics /></section>

      <Collections
        collections={collections}
        entriesByCollection={entriesByCollection}
      />
    </div>
  )
}

export default Dashboard