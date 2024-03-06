import { redirect } from 'next/navigation'

import { nanoid } from '@/lib/utils'

export default function Home() {
  const id = nanoid()
  redirect(`/chat/${id}`)
}
