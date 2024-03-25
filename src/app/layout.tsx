import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import Script from 'next/script'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Analytics from '@/components/analytics'
import { Providers } from '@/components/providers'
import { config } from '@/lib/config'

import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Prisma Assistant',
  description:
    'A tool that lets you interact with your schema conversationally to gain insights and generate code, directly within your development environment.',
  metadataBase: new URL('https://prismaassistant.com'),
  openGraph: {
    images: [{ url: `/og.png`, width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <Toaster />
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
        {config.isWebsiteMode && (
          <>
            <Analytics />
            <Script
              async
              defer
              src="https://scripts.simpleanalyticscdn.com/latest.js"
            />
          </>
        )}
      </body>
    </html>
  )
}
