#!/usr/bin/env node

const next = require('next')
const path = require('path')
const { parse } = require('url')
const { createServer } = require('http')
const { program } = require('commander')

function getSchemaPath(schema) {
  return path.resolve(__dirname, schema)
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
      path: path.resolve(__dirname, '.env.prisma-assist'),
    })

    const app = next({
      dev: false,
      customServer: true,
    })

    const handle = app.getRequestHandler()

    app.prepare().then(() => {
      process.env['SCHEMA_PATH'] = getSchemaPath(schema)
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
