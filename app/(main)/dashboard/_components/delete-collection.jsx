'use client'

import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/use-fetch'
import { deleteCollection } from '@/actions/collection'
import { toast } from 'sonner'





const DeleteCollectionDialog = ({ collection, entriesCount = 0 }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const {
    loading: isDeleting,
    fn: deleteCollectionFn,
    data: deletedCollection,
  } = useFetch(deleteCollection)

  useEffect(() => {
    if (deletedCollection && !isDeleting) {
      setOpen(false)
      toast.error(`Collection "${collection.name}" is deleted`)
      router.push('/dashboard')
    }
  }, [deletedCollection, isDeleting, collection.name, router])

  const handleDelete = () => {
    deleteCollectionFn(collection.id)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='sm'>
          <Trash2 className='h-4 w-4 mr-2' />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete “{collection.name}”?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {entriesCount > 0
              ? `This will remove the collection and its ${entriesCount} entries.`
              : `This collection has no entries.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Collection'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCollectionDialog
