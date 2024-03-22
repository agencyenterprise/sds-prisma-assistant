'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

import { init, pageView } from '@/lib/analytics'

export function Component() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => init(), [])
  useEffect(() => pageView(), [pathname, searchParams])

  return null
}

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      {/* Must wrap with suspense */}
      {/* https://nextjs.org/docs/app/api-reference/functions/use-router#router-events */}
      <Component />
    </Suspense>
  )
}
