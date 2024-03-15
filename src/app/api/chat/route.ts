import Anthropic from '@anthropic-ai/sdk'
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from 'ai'
import { readFileSync } from 'node:fs'
import OpenAI from 'openai'

export async function POST(req: Request) {
  return await forAnthropic(req)
}

async function forAnthropic(req: Request) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  })

  const { messages } = await req.json()

  const response = await anthropic.messages.create({
    system: getSystemPrompt(),
    messages,
    model: 'claude-3-opus-20240229',
    stream: true,
    max_tokens: 500,
  })

  const stream = AnthropicStream(response)

  return new StreamingTextResponse(stream)
}

async function forOpenAI(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  })

  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      {
        role: 'system',
        content: getSystemPrompt(),
      },
      ...messages,
    ],
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}

function getSystemPrompt(): string {
  const content = readFileSync('schemas/stocks/schema.prisma', 'utf8')
  return [
    'You are an expert on Prisma ORM. You will be given a Prisma Schema, and you will use your expertise to help users with the following tasks:',
    '1. Write queries.',
    '2. Write mutations.',
    '3. Change the schema.',
    '4. Understand the schema.',
    '',
    'Whenever you are asked to generate code, you should default to writing Typescript, although you can also generate plain Javascript if asked to.',
    'You can also generate prisma schemas or change the existing ones if asked to.',
    'If you are asked questions unrelated to Prisma ORM or outside the scope of your allowed tasks, you will respectfully deny the request.',
    'Assume the users have already set up Prisma on their project and are knowledgeable about It. Avoid generating unnecessary boilerplate, comments, variable assignments, imports, and functions.',
    'Always double-check for correctness. Your code should be production-ready.',
    'When creating code, avoid including relations unless the user requests it.',
    'When writing code, avoid including imports, functions, or variables.',
    '',
    'Here\'s the Prisma Schema: """',
    content,
    '"""',
  ].join('\n')
}
