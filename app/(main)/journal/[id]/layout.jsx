import Link from 'next/link'





export default function EntryLayout({ children }) {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white font-semibold rounded-md transition">
          Back to Dashboard
        </Link>
      </div>
      {children}
    </div>
  )
}
