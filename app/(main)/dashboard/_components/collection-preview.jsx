'use client'

import { Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import DeleteCollectionDialog from '../../collection/_components/delete-collection'
import { useRouter } from 'next/navigation'





const FolderTab = ({ variant }) => {
  let color = 'bg-purple-600'

  if (variant === 'unorganized') color = 'bg-purple-700'
  if (variant === 'create') color = 'bg-purple-500'

  return (
    <div className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors ${color}`} />
  )
}

const CollectionPreview = ({
  id,
  name,
  entries = [],
  isUnorganized = false,
  isCreateNew = false,
  onCreateNew
}) => {
  const router = useRouter()

  if (isCreateNew) {
    return (
      <button
        onClick={onCreateNew}
        className="relative group h-[200px] cursor-pointer w-full"
      >
        <FolderTab variant="create" />
        <div className="relative h-full w-full rounded-lg p-6 shadow-md hover:shadow-lg transition-all
            flex flex-col items-center justify-center gap-4 bg-white text-purple-700 border border-purple-200">
          <div className="h-12 w-12 rounded-full bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center">
            <Plus className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-center text-purple-700 font-semibold">Create New Collection!</p>
        </div>
      </button>
    )
  }

  const bgClass = isUnorganized ? 'bg-purple-950' : 'bg-purple-300'
  const tabVariant = isUnorganized ? 'unorganized' : 'collection'
  const folderHref = isUnorganized ? '/collection/unorganized' : `/collection/${id}`

  return (
    <div className="relative h-[200px] w-full">
      <FolderTab variant={tabVariant} />
      
      <Link
        href={folderHref}
        className={`relative h-full block rounded-lg p-6 shadow-md hover:shadow-lg transition-all 
        ${bgClass} text-purple-700 flex flex-col justify-between`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🌙</span>
          <h3 className="text-purple font-semibold text-lg truncate">{name}</h3>
        </div>
        <p className="text-sm opacity-70 text-gray">
          {isUnorganized ? 'Unorganized notes' : 'Collection Folder'}
        </p>
      </Link>

      {/* Delete Button (only for normal collections) */}
      {!isUnorganized && (
        <div className="absolute top-2 right-2 z-10">
          <DeleteCollectionDialog collection={{ id, name }} entriesCount={entries.length} />
        </div>
      )}
    </div>
  )
}

export default CollectionPreview
