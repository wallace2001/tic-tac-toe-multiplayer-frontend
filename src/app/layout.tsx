import ClientOnly from '@/components/ClientOnly'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToasterProvider from '@/providers/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tik Tak Toe',
  description: 'Tik Tak Toe Multiplayer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
        <ToasterProvider />
          {children}
        </ClientOnly>
      </body>
    </html>
  )
}
