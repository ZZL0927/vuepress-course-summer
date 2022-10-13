import http from '../libs/http'
import { IAddReq } from '../models/reqs'
import { IAddRes } from '../models/res'

export async function add (data: IAddReq) {
  const res = await http.post<IAddRes>('/api/add', data)
  return res.data
}
