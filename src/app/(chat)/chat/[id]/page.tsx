import { Chat } from '@/components/chat'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chat = {
    id: params.id,
    messages: [],
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
