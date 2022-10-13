import { IncomingMessage, ServerResponse } from 'http'

/**
 * 请求上下文类
 */
export default class Context {
  path: string
  req: IncomingMessage
  res: ServerResponse
  body: any
  query: Record<string, string | string[]> = {}
  cookie: Record<string, string> = {}

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req
    this.res = res
    this.parseQuery()
    this.parseCookie()
  }

  /**
   * 解析query参数
   */
  parseQuery() {
    try {
      const [path, query] = this.req.url.split('?')
      this.path = path
      const params = new URLSearchParams(query)
      this.query = Object.fromEntries(params.entries())
    } catch (error) {}
  }

  /**
   * 解析cookie
   */
  parseCookie() {
    try {
      if (!this.req.headers.cookie) return
      const arr = this.req.headers.cookie
        .split(';')
        .filter(item => item.trim() !== '')
      for (const item of arr) {
        const [key, value] = item.split('=')
        this.cookie[key.trim()] = value.trim()
      }
    } catch (error) {}
  }

  /**
   * 返回json
   * @param data
   */
  json(data: any) {
    this.res.setHeader('Content-Type', 'application/json')
    this.res.end(JSON.stringify(data))
  }

  /**
   * 设置cookie
   * @param name
   * @param value
   */
  setCookie(name: string, value: string) {
    this.res.setHeader('Set-Cookie', `${name}=${value}; path=/`)
  }

  /**
   * 解析body
   */
  async parseBody() {
    // 只处理post json的情况
    if (this.req.headers['content-type']?.startsWith('application/json')) {
      try {
        let content = ''
        this.req.setEncoding('utf-8')
        // 等待请求体的数据接受完
        for await (const chunk of this.req) {
          content += chunk
        }
        this.body = JSON.parse(content)
      } catch (error) {}
    }
  }
}
