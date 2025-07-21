import "./globals.css";
import { Poppins } from 'next/font/google'
import Header from '../components/header.jsx'
import { ClerkProvider } from '@clerk/nextjs'
import { FaMoon } from 'react-icons/fa'





export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata = {
  title: "StarLit",
  description: "A Daily Journal with Built-In Mood Analytics",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`poppins.className text-purple-700 font-bold`}>
          <div className="bg-[url('/background.png')] opacity-100 fixed -z-10 inset-0"/>
          <Header />
          <main className='min-h-screen'>{children}</main>



          <footer className='bg-transparent py-4'>
            <div className='max-w-md mx-auto bg-purple-100 bg-opacity-30 rounded-2xl shadow-md p-3'>
              <p className='text-center text-purple-900 font-semibold text-sm'>
                <span className='inline-flex items-center justify-center gap-1'>
                  Built with Love and A Little Starlight <FaMoon size={15}/>
                </span>
                  <br />
                  By Tram Tran</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
