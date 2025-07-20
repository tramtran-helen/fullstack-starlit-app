import react from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'





const Header = () => {
    return(
        <header className='w-full py-4'>
            <nav className='w-full flex items-center justify-between px-8'>
                <Link href={'/'}>
                <Image src='/logo.png' alt='StarLit logo' width={160} height={80} className='object contain'/>
                </Link>

            

            <div className='flex items-center gap-4 pr-14'>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            </nav>
        </header>
    )
}

export default Header