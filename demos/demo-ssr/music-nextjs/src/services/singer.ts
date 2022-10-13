import request from '../libs/request'
import { ApiResp, ISinger } from '../libs/models'

export async function listSingers() {
  const { data } = await request.get<
    ApiResp<{ items: ISinger[]; total: number }>
  >('/api/v1/singer/list')
  return data
}

export async function getSinger(_id: string) {
  const { data } = await request.get<ApiResp<{ singer: ISinger }>>(
    '/api/v1/singer/detail?_id=' + _id
  )
  return data
}
