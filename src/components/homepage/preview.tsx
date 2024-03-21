import React, { PropsWithChildren } from 'react'

import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'

function Sender({ children }: PropsWithChildren) {
  return (
    <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-background">
      {children}
    </div>
  )
}

export function Preview() {
  return (
    <div className="bg-white w-full max-w-3xl mx-auto mt-24 rounded-t-xl">
      <div className="flex gap-4 items-center p-8">
        <Sender>
          <IconUser />
        </Sender>
        <div>List all users with their portfolio</div>
      </div>
      <Separator />
      <div className="flex gap-4 items-start p-8">
        <Sender>
          <IconOpenAI />
        </Sender>
        <div className="w-full">
          <Code />
        </div>
      </div>
    </div>
  )
}

function Code() {
  return (
    <div className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 min-w-full space-y-6 break-words">
      <pre>
        <div className="relative w-full font-sans codeblock bg-zinc-950">
          <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100">
            <span className="text-xs lowercase">typescript</span>
          </div>
          <div
            style={{
              color: 'rgb(227, 234, 242)',
              background: 'transparent',
              fontFamily:
                'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
              textAlign: 'left',
              whiteSpace: 'pre',
              wordSpacing: 'normal',
              wordBreak: 'normal',
              overflowWrap: 'normal',
              lineHeight: '1.5',
              tabSize: 4,
              hyphens: 'none',
              padding: '1.5rem 1rem',
              margin: 0,
              overflow: 'auto',
              width: '100%',
            }}
          >
            <code
              style={{
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'pre',
              }}
            >
              <span style={{ color: 'rgb(233, 174, 126)' }}>await</span>
              <span> prisma</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>.</span>
              <span style={{ color: 'rgb(108, 184, 230)' }}>user</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>.</span>
              <span style={{ color: 'rgb(108, 184, 230)' }}>findMany</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>(</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>{'{'}</span>
              <span>{'\n'}</span>
              <span>{'  '}include</span>
              <span style={{ color: 'rgb(233, 174, 126)' }}>:</span>
              <span> </span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>{'{'}</span>
              <span>{'\n'}</span>
              <span>{'    '}portfolios</span>
              <span style={{ color: 'rgb(233, 174, 126)' }}>:</span>
              <span> </span>
              <span style={{ color: 'rgb(230, 211, 122)' }}>true</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>,</span>
              <span>{'\n'}</span>
              <span>{'  '}</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>{'}'}</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>,</span>
              <span>{'\n'}</span>
              <span />
              <span style={{ color: 'rgb(227, 234, 242)' }}>{'}'}</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>)</span>
              <span style={{ color: 'rgb(227, 234, 242)' }}>;</span>
            </code>
          </div>
        </div>
      </pre>
    </div>
  )
}
