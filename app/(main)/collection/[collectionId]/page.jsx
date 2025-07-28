import { getCollection } from "@/actions/collection"
import { getJournalEntries } from "@/actions/journal"
import DeleteCollectionDialog from "../_components/delete-collection"
import JournalFilters from "../_components/journal-filters"





const CollectionPage = async ({params}) => {
    const { collectionId } = params
    const entries = await getJournalEntries({ collectionId })
    const collection = await getCollection(collectionId)

    return(
        <div className='space-y-6'>
            <div className='flex flex-col justify-between'>
                <div className='flex justify-between'>
                    <h1 className='text-5xl text-purple-400 md:text-7xl lg:text-8xl mb-6 gradient-title pt-7'>
                        {collectionId === "unorganized" ? "Unorganized entries" : collection?.name || "Collection"}
                    </h1>
                    {collection && <DeleteCollectionDialog
                        collection={collection}
                        entriesCount={entries?.data?.entries?.length ?? 0} />}
                </div>
                {collection?.description && (
                    <h2 className='text-purple-400 gradient-title'>{collection?.description}</h2>
                )}
            </div>

            <JournalFilters entries={entries?.data?.entries ?? []}/>
        </div>
    )
}

export default CollectionPage