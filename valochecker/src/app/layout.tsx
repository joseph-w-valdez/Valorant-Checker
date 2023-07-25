import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react';
import Navbar from '@/components/Navbar';
import ReactLoading from 'react-loading';
import { LoadingProvider, useLoadingContext } from '@/contexts/LoadingContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { isLoading } = typeof window !== 'undefined'
    ? useLoadingContext()
    : { isLoading: false }

  return (
     <LoadingProvider>
       <html>
        <body className='App flex flex-col min-h-screen'>
          {isLoading && (
            <div className="fixed flex flex-wrap justify-center items-center z-[100] w-full h-full">
              <ReactLoading type="spin" color="#fff" />
            </div>
          )}
          <Navbar />
          <main className='flex-grow relative top-14'>
            <div className="flex flex-wrap justify-center">
              {children}
            </div>
          </main>
        </body>
      </html>
     </LoadingProvider>
  )
}