import * as fs from 'fs'
import * as path from 'path'
import { renderToString } from 'react-dom/server'
import { Middleware } from 'koa'

import { PageItem, ServerSideProps } from '../models/types'
import Index, { getServerSideProps } from '../pages/index'

const html = fs.readFileSync(
  path.join(process.cwd(), 'public/index.tpl'),
  'utf-8'
)

// 建立请求路径和页面组件的映射关系
const pages: Record<string, PageItem> = {
  '/': {
    app: Index,
    prefetch: getServerSideProps
  }
}

// React服务端渲染中间件
const render: Middleware = async (ctx, next) => {
  const [urlPath] = ctx.url.split('?')
  const page = pages[urlPath]
  if (!page) return next()
  let data: ServerSideProps = {
    props: {}
  }
  if (page.prefetch) {
    data = await page.prefetch(ctx)
  }
  // 在服务端将React组件树渲染成DOM字符串，不依赖浏览器
  const app = renderToString(<page.app {...data.props} />)
  const content = html
    // 替换html模板中的占位符
    .replace('{{app}}', app)
    // 将服务端渲染的状态数据注入到html
    .replace('{{state}}', JSON.stringify(data.props))
    // 修改页面标题
    .replace('{{title}}', data.meta?.title || '')
  // 设置响应头
  ctx.set('Content-Type', 'text/html')
  // 将组装完成的html返回
  ctx.body = content
}

export default render
