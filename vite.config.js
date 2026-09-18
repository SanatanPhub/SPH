import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function devApiPlugin() {
  return {
    name: 'dev-api',
    configureServer(server) {
      const env = loadEnv('development', process.cwd(), '')
      Object.assign(process.env, env)

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()

        const routeName = req.url.replace('/api/', '').split('?')[0]
        let handler
        try {
          const mod = await server.ssrLoadModule(`/api/${routeName}.js`)
          handler = mod.default
        } catch {
          return next()
        }

        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', async () => {
          try {
            req.body = body ? JSON.parse(body) : {}
          } catch {
            req.body = {}
          }

          res.status = (code) => { res.statusCode = code; return res }
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          }

          try {
            await handler(req, res)
          } catch (err) {
            console.error('API error:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal server error' }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), devApiPlugin()],
})
