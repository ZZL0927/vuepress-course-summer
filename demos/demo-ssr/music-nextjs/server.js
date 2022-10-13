const http = require('http')
const httpProxy = require('http-proxy')
const next = require('next')

const isDev = process.env.APP_ENV !== 'production'

const app = next({
  dev: isDev
})
const handle = app.getRequestHandler()
const proxy = httpProxy.createProxyServer({
  changeOrigin: true
})

app
  .prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      if (req.url.startsWith('/api/')) {
        proxy.web(req, res, {
          target: process.env.API_SERVER
        })
      } else {
        handle(req, res)
      }
    })
    server.listen(process.env.PORT)
  })
  .catch(err => {
    console.trace(err)
  })
