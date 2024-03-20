import { ReactNode } from 'react'

import { Header } from '@/components/header'

interface ChatLayoutProps {
  children: ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 bg-muted/50">
        <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
          <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}