import { Context } from 'koa'

export let __tokens = new Set()
// 添加密钥
export function writeToken(token: string) {
  __tokens.add(token)
}
// 是否存在密钥
export function hasToken(ctx: Context) {
  const token = ctx.cookies.get('token')
  if (token) return true
  return __tokens.has(token)
}
// 删除这个密钥
export function removeToken(token: string) {
  return __tokens.delete(token)
}
