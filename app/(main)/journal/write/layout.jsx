import Link from 'next/link'
import react, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'






const WriteLayout = ({children}) => {
    return(
        <div className='container mx-auto px-4 py-8'>
            <div>
                <Link href='/dashboard' className='text-sm text-purple-700'>
                Back to Dashboard</Link>
            </div>

            <Suspense>{children}</Suspense>
            </div>
    )
}

export default WriteLayout