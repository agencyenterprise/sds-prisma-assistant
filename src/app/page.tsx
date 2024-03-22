import { redirect } from 'next/navigation'
import React from 'react'

import Homepage from '@/components/homepage'
import { config } from '@/lib/config'

export default function Home() {
  if (!config.isWebsiteMode) {
    redirect(`/assistant`)
  }

  return <Homepage />
}
