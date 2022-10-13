import * as Router from 'koa-router'
import { stats } from '../../stats'
import { IUpload } from '../../types'
import { generateOk } from '../../lib/check'
import { uploadFile } from '../../lib/upload'

const router = new Router({
  prefix: '/api/console/form'
})

router.post('/upload', async (ctx) => {
  console.log('ctx:', JSON.stringify(ctx))
  let res = (await uploadFile(ctx)) as IUpload
  if (!res?.success) throw stats.UPLOAD_ERROR
  ctx.body = generateOk({
    file: res.formData.url
  })
})

export default router
