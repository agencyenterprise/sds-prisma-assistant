import { Message } from 'ai'
import React from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { twMerge } from 'tailwind-merge'

import { ChatMessageActions } from '@/components/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground',
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            img({ node, ...props }) {
              return <img className="max-w-[67%]" {...props} />
            },
            code({ node, className, children, ...props }) {
              const childArray = React.Children.toArray(children)
              const firstChild = childArray[0] as React.ReactElement
              const firstChildAsString = React.isValidElement(firstChild)
                ? (firstChild as React.ReactElement).props.children
                : firstChild

              if (firstChildAsString === '▍') {
                return (
                  <span className="mt-1 animate-pulse cursor-default">▍</span>
                )
              }

              if (typeof firstChildAsString === 'string') {
                childArray[0] = firstChildAsString.replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (
                typeof firstChildAsString === 'string' &&
                !firstChildAsString.includes('\n')
              ) {
                return (
                  <code
                    className={twMerge(
                      className,
                      'not-prose bg-black/90 rounded-full px-2 font-medium text-white',
                    )}
                    {...props}
                  >
                    {childArray}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(childArray).replace(/\n$/, '')}
                  {...props}
                />
              )
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}
