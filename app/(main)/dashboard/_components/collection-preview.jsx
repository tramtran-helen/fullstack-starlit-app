'use client'

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
        return <button className='relative group h-[200px] cursor-pointer'>
            <FolderTab colorClass={colorSchemes['createCollection'].bg}/>
        </button>
    }

    return(
        <div>CollectionPreview</div>
    )
}

export default CollectionPreview

