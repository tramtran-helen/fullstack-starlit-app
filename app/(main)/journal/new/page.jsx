"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function EntryForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.target)
    const entryData = {
      title: formData.get('title'),
      content: formData.get('content'),
      // ...any other fields
    }

    try {
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryData),
      })
      const data = await res.json();
      if (data && data.id) {
        router.push(`/entries/${data.id}`)
      } else {
        router.push('/entries')
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Your entry..." required />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
