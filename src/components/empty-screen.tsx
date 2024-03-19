import { UseChatHelpers } from 'ai/react'

import { ExternalLink } from '@/components/external-link'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'List the models on your schema.',
    message: 'List the models on my schema.',
  },
  {
    heading: 'Generate a query',
    message: `Generate a query for the User model.`,
  },
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Prisma Assistant!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Prisma Assistant is a helpful assistant expert on prisma.io. It can
          answer questions about a Prisma schema.
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
