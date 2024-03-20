import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { config } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Prisma Assistant',
}

export default function Home() {
  if (!config.isWebsiteMode) {
    redirect(`/assistant`)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link href="/assistant">Demo</Link>
    </div>
  )
}
