'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'





const CollectionForm = ({ open, setOpen, loading, onSuccess }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async () => {
    await onSuccess({ name, description })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-purple-100 rounded-2xl shadow-md p-6 space-y-4">
        <DialogTitle className="text-purple-700 font-bold text-xl mb-2">
          Create a New Collection
        </DialogTitle>

        <label className="block text-purple-700 font-semibold mb-1">
          Collection name
        </label>
        <Input
          placeholder='Collection Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-4 text-md rounded-xl border-2 border-purple-700 bg-white
            placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-700 transition"
          disabled={loading}
        />

        <label className="block text-purple-700 font-semibold mb-1">
          Description (optional)
        </label>
        <Input
          placeholder='Description (Optional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full py-4 text-md rounded-xl border-2 border-purple-700 bg-white
            placeholder-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-700 transition"
          disabled={loading}
        />

        <Button
          disabled={loading || !name.trim()}
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition"
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default CollectionForm