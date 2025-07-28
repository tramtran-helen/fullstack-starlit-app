'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { PenBox, FolderOpen } from 'lucide-react'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'





const Header = async () => {
    await checkUser()

    return(
        <header className='w-full py-4'>
            <nav className='w-full flex items-center justify-between px-8'>
                <Link href={'/'}>
                <Image src='/logo.png' alt='StarLit logo' width={160} height={80} className='object-contain'/>
                </Link>

            

            <div className='flex items-center gap-4 pr-14'>
                <SignedIn>
                    <Link href='/dashboard#collections'>
                        <Button variant='outline'>
                            <FolderOpen size={18}/>
                            <span className='hidden md:inline'>Collections</span>
                        </Button>
                    </Link>
                </SignedIn>



                <Link href='/journal/write'>
                    <Button variant='outline'>
                        <PenBox size={18}/>
                        <span className='hidden md:inline'>Craft New Thoughts!</span>
                    </Button>
                
                </Link>



                <SignedOut>
                    <SignInButton forceRedirectUrl='/dashboard'>
                        <Button variant='outline'>Login</Button>
                    </SignInButton>
                </SignedOut>



                <SignedIn>
                    <UserMenu />
                </SignedIn>
            </div>
            </nav>
        </header>
    )
}

export default Header