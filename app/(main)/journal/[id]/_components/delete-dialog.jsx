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
import { toast } from 'sonner'
import { deleteJournalEntry } from '@/actions/journal'

const DeleteDialog = ({ entryId }) => {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const {
    loading: isDeleting,
    fn: deleteEntryFn,
    data: deletedEntry,
  } = useFetch(deleteJournalEntry)

  useEffect(() => {
    if (deletedEntry && !isDeleting) {
      setDeleteDialogOpen(false)
      toast.error(`Journal entry deleted successfully`)
      router.push(`/collection/${
        deletedEntry.collectionId ? deletedEntry.collectionId : 'unorganized'
      }`)
    }
  }, [deletedEntry, isDeleting, router])

  const handleDelete = () => {
    deleteEntryFn(entryId)
  }

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size='sm'
          variant='destructive'
          className='bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 h-8'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will permanently delete your entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Entry'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
