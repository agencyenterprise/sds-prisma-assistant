import { Metadata } from 'next'

import { Chat } from '@/components/chat'
import { nanoid } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Prisma Assistant',
}

export default function IndexPage() {
  const id = nanoid()

  return <Chat id={id} />
}
