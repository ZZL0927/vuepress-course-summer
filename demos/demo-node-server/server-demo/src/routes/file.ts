import { finished } from 'stream/promises'
import * as fs from 'fs'
import * as path from 'path'
import * as router from '../libs/router'

const tmpdir = path.join(__dirname, '../../tmp')

router.get('/api/file/list', async () => {
  try {
    const files = await fs.promises.readdir(tmpdir)
    return {
      code: 0,
      files
    }
  } catch (error) {
    return {
      code: 0,
      files: []
    }
  }
})

router.get('/api/file/download', async ctx => {
  const name = ctx.query.name as string
  try {
    const file = path.join(tmpdir, name)
    await fs.promises.access(file)
    const stream = fs.createReadStream(file)
    ctx.res.setHeader('Content-Disposition', 'attachment; filename=' + name)
    return stream
  } catch (error) {
    if (error.code === 'ENOENT') {
      ctx.res.statusCode = 404
      return {
        code: 30001,
        message: '找不到该文件'
      }
    } else {
      return {
        code: 30002,
        message: '无法读取该文件'
      }
    }
  }
})

router.post('/api/file/upload', async ctx => {
  const name = ctx.query.name as string
  const dir = path.join(__dirname, '../../tmp')
  try {
    await fs.promises.access(dir)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.promises.mkdir(dir)
    }
  }
  const newName = Buffer.from(name).toString('hex') + path.extname(name)
  const stream = fs.createWriteStream(path.join(dir, newName))
  ctx.req.pipe(stream)
  await finished(stream)
  return {
    code: 0,
    name: newName
  }
})
