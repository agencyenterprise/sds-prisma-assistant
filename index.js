const next = require('next')
const path = require('path')
const { parse } = require('url')
const { createServer } = require('http')

const app = next({
  dev: false,
  customServer: true,
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  process.env['SCHEMA_PATH'] = getSchemaPath()
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3007, () => {
    console.log('> Ready on http://localhost:3007')
  })
})

function getSchemaPath() {
  return path.resolve(__dirname, './schemas/stocks/schema.prisma')
}
