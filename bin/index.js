#!/usr/bin/env node

const fs = require('fs')
const next = require('next')
const path = require('path')
const { parse } = require('url')
const { createServer } = require('http')
const { program } = require('commander')
const { red, green, bold, underline } = require('kleur')

function getSchemaPath(schema) {
  const filepath = path.resolve(process.cwd(), schema)

  if (!fs.existsSync(filepath)) {
    program.error(
      [
        `${red('Error:')} Could not find a ${bold('schema.prisma')} file that is required for this command.`,
        `You can either provide it with ${green('--schema')} or put it into the default location ${green('./prisma/schema.prisma')} ${underline('https://pris.ly/d/prisma-schema-location')}`,
      ].join('\n'),
    )
  }

  return filepath
}

function hasOpenAIEnvVars() {
  const keys = ['OPENAI_API_KEY', 'PRISMA_ASSIST_OPENAI_API_KEY']

  return keys.some((key) => process.env[key])
}

program
  .version('0.0.1')
  .description('Chat with your schema with Prisma Assist')
  .option('--schema <path>', 'Custom path to your Prisma schema')
  .option('-p, --port <number>', 'Port to start Prisma Assist on')
  .action((options) => {
    const port = options.port || 4500
    const schema = options.schema || './prisma/schema.prisma'

    require('dotenv').config({
      path: path.resolve(process.cwd(), '.env.prisma-assist'),
    })

    process.env['SCHEMA_PATH'] = getSchemaPath(schema)

    if (!hasOpenAIEnvVars()) {
      program.error(
        [
          `${red('Error:')} The OPENAI_API_KEY environment variable is missing or empty.`,
          `You can provide it globally as ${bold('OPENAI_API_KEY')}, or ${bold('PRISMA_ASSIST_OPENAI_API_KEY')}.`,
          `Example: $ export PRISMA_ASSIST_OPENAI_API_KEY=variable_value`,
        ].join('\n'),
      )
    }

    const app = next({
      dev: false,
      customServer: true,
      dir: path.resolve(__dirname, '..'),
    })

    const handle = app.getRequestHandler()

    app.prepare().then(() => {
      createServer(async (req, res) => {
        await handle(req, res, parse(req.url, true))
      }).listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
      })
    })
  })

program.addHelpText(
  'after',
  `

Examples:
  $ npx prisma-assist --schema=./schema.prisma
`,
)

program.parse(process.argv)
