import Link from 'next/link'
import react, { Suspense } from 'react'






const WriteLayout = ({children}) => {
    return(
        <div className='container mx-auto px-4 py-8'>
            <div>
                <Link href='/dashboard' className='px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition text-center'>
                Back to Dashboard</Link>
            </div>

            <Suspense>{children}</Suspense>
            </div>
    )
}

export default WriteLayout