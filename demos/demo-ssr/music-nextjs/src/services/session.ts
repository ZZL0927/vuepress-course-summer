import { AxiosRequestHeaders } from 'axios'
import request from '../libs/request'
import { ApiResp, ISession } from '../libs/models'

/**
 * 拼装cookie字符串，如果cookie没有签名则不需要session_id.sig部分
 * @param cookies
 * @returns
 */
export function formatCookie(cookies: any) {
  return `session_id=${cookies.session_id || ''}; session_id.sig=${
    cookies['session_id.sig'] || ''
  }`
}

/**
 * 获取会话信息，同时支持服务端和前端，服务端需要手动传入cookie
 * @param cookie
 * @returns
 */
export async function get(cookie?: string) {
  let headers: AxiosRequestHeaders | undefined = undefined
  if (cookie) {
    headers = {
      cookie
    }
  }
  const { data } = await request.get<
    ApiResp<{
      session: ISession
    }>
  >('/api/v1/cookie/get', {
    headers
  })
  return data
}

/**
 * 前端请求设置会话cookie
 * @param name
 * @returns
 */
export async function set(name: string) {
  const { data } = await request.get<ApiResp>(
    `/api/v1/cookie/set?name=${encodeURIComponent(name)}`
  )
  return data
}
