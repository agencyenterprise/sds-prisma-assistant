import { redirect } from 'next/navigation'

import { config } from '@/lib/config'

export default function Home() {
  if (!config.isWebsiteMode) {
    redirect(`/assistant`)
  }

  return <div>Homepage</div>
}
