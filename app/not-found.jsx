'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import react from 'react'





const NotFound = () => {
    return(
        <div className='flex flex-col items-center justify-center text-center px-4'>
            <h1 className='text-5xl text-purple-400 md:text-7xl lg:text-8xl mb-6 gradient-title'>404</h1>
            <h2 className='text-5xl text-purple-400 md:text-7xl lg:text-8xl mb-6 gradient-title'>Page Not Found</h2>
            <p className='text-2xl text-purple-400 gradient-title'>Oops! The page that you are looking for does not exist!</p>
            
            <div className='mt-6'>
                <Link href='/'>
                    <Button variant='outline'>Return Home</Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound