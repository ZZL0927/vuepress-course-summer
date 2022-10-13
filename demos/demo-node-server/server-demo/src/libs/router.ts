import { Readable } from 'stream'
import Context from './Context'

type RouteCallback = (ctx: Context) => Promise<any>

interface RouteItem {
  path: string
  method: 'get' | 'post'
  callback: RouteCallback
}

const routes: RouteItem[] = []

export function get(path: string, callback: RouteCallback) {
  routes.push({
    path,
    method: 'get',
    callback
  })
}

export function post(path: string, callback: RouteCallback) {
  routes.push({
    path,
    method: 'post',
    callback
  })
}

export async function parse(ctx: Context) {
  for (const route of routes) {
    const method = ctx.req.method.toLowerCase()
    if (method === route.method && ctx.path === route.path) {
      try {
        const result = await route.callback(ctx)
        if (result instanceof Buffer) {
          return ctx.res.end(result)
        } else if (result instanceof Readable) {
          return result.pipe(ctx.res)
        } else if (result instanceof Object) {
          return ctx.json(result)
        } else {
          return ctx.res.end(result || '')
        }
      } catch (error) {
        console.trace(error)
        ctx.res.statusCode = 500
        ctx.res.end()
        return
      }
    }
  }
  ctx.res.statusCode = 404
  ctx.res.end()
}
