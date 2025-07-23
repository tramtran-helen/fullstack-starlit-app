'use client'

import CollectionForm from "@/components/forms"
import CollectionPreview from "./collection-preview"
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import { createCollection } from "@/actions/collection"
import useFetch from "@/hooks/use-fetch"




const Collections = ({ collections = [], entriesByCollection }) => {
    const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false)

    const {
        loading: createCollectionLoading,
        fn: createCollectionFn,
        data: createdCollection,
    } = useFetch(createCollection)

    useEffect(() => {
        if (createdCollection) {
            setIsCollectionDialogOpen(false)
            toast.success(`Collection ${createdCollection.name} created!`)
        }
    }, [createdCollection])

    const handleCreateCollection = async () => {
        createCollectionFn(data)
    }

    if (collections.length === 0) return <></>



    return (
  <section id='collections' className='space-y-6'>
    <h2 className='text-3xl text-purple-400 md:text-5xl lg:text-8xl mb-6 gradient-title'>
      Collections
    </h2>

    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      <CollectionPreview
        isCreateNew={true}
        onCreateNew={() => setIsCollectionDialogOpen(true)}
      />

      {entriesByCollection.unorganized?.length > 0 && (
        <CollectionPreview
          name='Unorganized'
          entries={entriesByCollection.unorganized}
          isOrganized={true}
        />
      )}

      {collections.map((collection) => (
        <CollectionPreview
          key={collection.id}
          id={collection.id}
          name={collection.name}
          entries={entriesByCollection[collection.id] || []}
        />
      ))}
    </div>

    <CollectionForm 
      loading={createCollectionLoading}
      onSuccess={handleCreateCollection}
      open={isCollectionDialogOpen}
      setOpen={setIsCollectionDialogOpen}
    />
  </section>
    )
}

export default Collections