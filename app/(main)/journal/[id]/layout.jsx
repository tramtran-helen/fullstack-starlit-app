import { Link } from "next/link";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";





export default function EntryLayout({ children }) {
  return (
    <div className='px-4 py-8'>
      <div className='mb-8'>
        <Link href='/dashboard' className='text-sm text-purple-500 hover:text-purple-700'>
          Back to Dashboard
        </Link>
      </div>

      <Suspense fallback={<BarLoader color='purple' width="100%" />}>
        {children}
      </Suspense>
    </div>
  )
}