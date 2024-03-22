import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React, { PropsWithChildren, ReactNode } from 'react'

import Banner from '@/components/banner'
import { StayInformed } from '@/components/stay-informed'

import { InstallButton } from './install-button'
import { Logo } from './logo'
import { Preview } from './preview'

const header = (
  <div className="flex items-center justify-between">
    <div>
      <Logo />
    </div>
    <div>
      <Link
        href="/assistant"
        data-analytics="open-prisma-assistant-playground"
        className="bg-[#4B5563] py-2.5 px-4 rounded-md text-white text-sm flex items-center gap-2"
      >
        Playground
        <ExternalLink size={18} />
      </Link>
    </div>
  </div>
)

export default function Homepage() {
  return (
    <div>
      <Banner />
      <div className="pt-8 bg-[#1F2937]">
        <div className="max-w-6xl mx-auto px-6">
          {header}
          <div className="flex flex-col gap-11 mt-20">
            <div className="text-white text-center flex flex-col gap-5">
              <h1 className="text-6xl font-bold">
                Chat with <span className="text-[#29F7C5]">Prisma</span>
              </h1>
              <h2 className="max-w-3xl mx-auto">
                A tool that lets you interact with your schema conversationally
                to gain insights and generate code, directly within your
                development environment.
              </h2>
            </div>
            <InstallButton />
          </div>
          <Preview />
        </div>
        <GettingStarted />
      </div>
    </div>
  )
}

function GettingStarted() {
  return (
    <section className="bg-[#F9FAFB] px-6 py-24" id="getting-started">
      <div className="max-w-3xl mx-auto flex flex-col gap-y-10">
        <StayInformed>
          <div
            className="rounded-full px-5 py-2 text-black"
            style={{
              background:
                'linear-gradient(90deg, #D3E9DC -1.48%, #B8C3FA 100.98%)',
            }}
          >
            <b>Note:</b> Prisma Assistant is currently in early alpha.{' '}
            <span className="underline underline-offset-2">
              Stay informed with new features and updates
            </span>
            .
          </div>
        </StayInformed>
        <div className="prose min-w-full">
          <h2 className="text-4xl text-[#1E1865] font-bold">Getting Started</h2>
          <p>
            To use Prisma Assistant, you&apos;ll need to set up your environment
            with an OpenAI API key, which can be obtained from the{' '}
            <Link href="https://openai.com/api" target="_blank">
              OpenAI API portal
            </Link>
            .
          </p>
          <h3>MacOS/Linux Users</h3>
          <p>
            Open a terminal and run the following command to set the environment
            variable:
          </p>
          <Code>
            export PRISMA_ASSISTANT_OPENAI_API_KEY=your_openai_api_key
          </Code>
          <p>
            Replace <b>your_openai_api_key</b> with your actual OpenAI API key.
          </p>
          <h3>Windows Users</h3>
          <p>
            Open a command prompt and run the following command to set the
            environment variable:
          </p>
          <Code>set PRISMA_ASSISTANT_OPENAI_API_KEY=your_openai_api_key</Code>
          <p>
            Replace <b>your_openai_api_key</b> with your actual OpenAI API key.
          </p>
          <p>
            <b>Note:</b> These commands only set the environment variable for
            the current session. Ideally, you should set the environment
            variable permanently on your operating system.
          </p>
          <p>
            Next, start the Prisma Assistant server by running the following
            command in your terminal on the root of your Prisma project:
          </p>
          <Code>npx prisma-assistant@latest</Code>
          <p>
            Once the server is running, Prisma Assistant will provide you with a
            URL to access the UI in your web browser.
          </p>
        </div>
        <div className="prose min-w-full">
          <h2 className="text-4xl text-[#1E1865] font-bold">
            Optional Environment Variables
          </h2>
          <ul>
            <li>
              <b>PRISMA_ASSISTANT_OPENAI_MODEL</b> - ID of the model to use
            </li>
            <li>
              <b>PRISMA_ASSISTANT_OPENAI_API_BASE_URL</b> - Override the default
              base URL for the API
            </li>
          </ul>
        </div>
        <div className="prose min-w-full">
          <h2 className="text-4xl text-[#1E1865] font-bold">
            Run it with Ollama
          </h2>
          <p>
            You can also run Prisma Assistant with Ollama. To do so, set the
            following environment variables:
          </p>
          <Code>
            PRISMA_ASSISTANT_OPENAI_MODEL=&quot;llama2&quot;{' '}
            <Comment text="Or any other model" />
            <br />
            PRISMA_ASSISTANT_OPENAI_API_KEY=&quot;ollama&quot;
            <br />
            PRISMA_ASSISTANT_OPENAI_API_BASE_URL=&quot;http://localhost:11434/v1&quot;
          </Code>
        </div>
        <div className="prose min-w-full">
          <h2 className="text-4xl text-[#1E1865] font-bold">
            Security Considerations
          </h2>
          <p>
            Your OpenAI API key is sensitive information, and we do not have
            access to it since Prisma Assistant runs entirely on your machine.
            We recommend that you keep your API key secure and do not share it
            with others.
          </p>
        </div>
      </div>
    </section>
  )
}

function Comment({ text }: { text: ReactNode }) {
  return (
    <span className="text-gray-400">
      <span># </span>
      {text}
    </span>
  )
}

function Code({ children }: PropsWithChildren) {
  return (
    <div className="bg-[#09090b] text-white rounded-lg px-5 py-2.5 font-mono overflow-x-scroll whitespace-nowrap">
      {children}
    </div>
  )
}
