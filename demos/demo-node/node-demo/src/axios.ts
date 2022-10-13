import axios from 'axios'
import ora from 'ora'
import chalk from 'chalk'
import { finished } from 'stream/promises'
import * as fs from 'fs'
import * as path from 'path'

const github = axios.create({
  baseURL: 'https://api.github.com'
})

interface IRepo {
  id: number
  name: string
  description: string
}

async function listRepos(org: string) {
  const resp = await github.get<IRepo[]>(`/orgs/${org}/repos`)
  console.log(resp.status)
  console.log(resp.headers)
  for (const repo of resp.data) {
    console.log(`${repo.name} -> ${repo.description}`)
  }
}

async function postJSON() {
  await axios.post(
    'http://example.com/api/ping',
    {
      name: 'abc',
      age: 20
    },
    {
      headers: {
        'X-From': 'axios'
      }
    }
  )
}

async function download() {
  const url =
    'https://pacakge.cache.wpscdn.cn/wps/download/Setup_6.0.0.1fix3_12012.00002019.exe'
  // 请求下载地址，需要指定responseType为stream，让resp.data以可读流的形式返回
  const { headers, data } = await axios.get(url, {
    responseType: 'stream'
  })
  // 根据下载地址获取文件名
  const name = path.basename(url)
  // 获取下载文件的大小
  const size = Number(headers['content-length'])
  // 创建一个文件写入流
  const stream = fs.createWriteStream(name)
  // 将响应数据流通过pipe管道连接到文件写入流
  data.pipe(stream)
  console.log(`downloading ${name}...`)
  // 创建一个加载指示器
  const spinner = ora('Loading unicorns').start()
  // 指示器的颜色
  spinner.color = 'green'
  // 记录已经下载的数据长度
  let loaded = 0
  // 监听响应流的data事件，chunk是本次读取的buffer数据
  data.on('data', (chunk: Buffer) => {
    // loaded累加到达的数据长度
    loaded += chunk.byteLength
    // 计算完成的百分比
    const percent = ((loaded / size) * 100).toFixed(1)
    spinner.text = `${percent}%`
  })
  // 等待写入流的结束，即下载完成
  await finished(stream)
  // 修改指示器的状态
  spinner.stopAndPersist({
    symbol: chalk.green('√')
  })
}

// listRepos('axios')
// download()
