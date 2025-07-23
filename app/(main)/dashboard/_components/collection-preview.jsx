'use client'

import { Link, Plus } from "lucide-react"

const colorSchemes = {
    unorganized: {
        bg: 'bg-purple-950',
        tab: 'text-white'
    },
    collection: {
        bg: 'bg-purple-900',
        tab: 'text-white'
    },
    createCollection: {
        bg: 'bg-purple-800',
        tab: 'text-white'
    }
}

const FolderTab = ({colorClass}) => (
    <div className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6
        transition-colors ${colorClass}`}/>
)

const CollectionPreview = ({
    id,
    name,
    entries = [],
    isUnorganized = false,
    isCreateNew = false,
    onCreateNew
}) => {
    if(isCreateNew) {
        return <button onClick={onCreateNew} className='relative group h-[200px] cursor-pointer'>
            <FolderTab colorClass={colorSchemes['createCollection'].bg}/>
            <div className={`relative h-full rounded-lg p-6 shadow-md hover:shadow-lg transition-all
                        flex flex-col items-center justify-center gap-4 bg-white text-purple-700 border border-purple-200`}>
                <div className='h-12 w-12 rounded-full bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center'>
                    <Plus className='h-6 w-6 text-purple-600'/>
                </div>
                <p>Create New Collection!</p>
            </div>
        </button>
    }

    return(
        <Link href={`/collection/${isUnorganized ? 'unorganized' : id}`} className='group relative'>
            <FolderTab colorClass={colorSchemes[isUnorganized ? 'unorganized' : 'collection'].tab} />
        </Link>
    )
}

export default CollectionPreview

