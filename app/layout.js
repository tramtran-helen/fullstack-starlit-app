import "./globals.css";
import { Poppins } from 'next/font/google'
import Header from '../components/header.jsx'
import { ClerkProvider } from '@clerk/nextjs'





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
        <body className={`poppins.className text-purple-400 font-bold`}>
          <div className="bg-[url('/background.png')] opacity-100 fixed -z-10 inset-0"/>
          <Header />
          <main className='min-h-screen'>{children}</main>



          <footer className='bg-purple-400 py-10 bg-opacity-10'>
            <div>
              <p className='mx-auto px-4 text-center text-black font-bold'>Made with 💗 by Tram Tran</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
