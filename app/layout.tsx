import './globals.css'
import { Inter } from 'next/font/google'
import { MemesDataContextProvider } from '@/app/memesDataContext';
import Head from 'next/head'

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meme World',
  description: 'ReactJS demo with Next.js created by Jian Zhou',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <body className={inter.className}> */}
      <body className='bg-gray-200'>
        <MemesDataContextProvider>{children}</MemesDataContextProvider>
      </body>
    </html>
  )
}
