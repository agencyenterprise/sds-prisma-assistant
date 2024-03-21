import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import Homepage from '@/components/homepage'
import { config } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Prisma Assistant',
}

export default function Home() {
  if (!config.isWebsiteMode) {
    redirect(`/assistant`)
  }

  return <Homepage />
}
