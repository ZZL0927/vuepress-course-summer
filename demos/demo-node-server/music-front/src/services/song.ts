import request from '../libs/request'
import { ApiResp, ISong } from '../libs/models'

export async function listSongs(
  params: {
    title?: string
    singerId?: string
    skip?: number
    limit?: number
  } = {}
) {
  const query = new URLSearchParams({
    skip: (params.skip || 0).toString(),
    limit: (params.limit || 10).toString()
  })
  if (params.title) query.append('title', params.title)
  if (params.singerId) query.append('singerId', params.singerId)
  const { data } = await request.get<
    ApiResp<{ items: ISong[]; total: number }>
  >('/api/v1/song/list?' + query.toString())
  return data
}
