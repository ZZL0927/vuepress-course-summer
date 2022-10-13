import * as request from './request'
import { IPerson, IArticle, IUser } from '../types'

interface BaseRes {
  stat: string
  message?: string
}

interface UserRes extends BaseRes {
  user: IUser
}

interface ListRes extends BaseRes {
  rows: IArticle[]
}

interface PersonList extends BaseRes {
  rows: IPerson[]
}

interface GetPerson extends BaseRes {
  data: IPerson
}

// 登录
export function login(username: string, password: string) {
  return request.post<BaseRes>('/api/auth/login', {
    username,
    password
  })
}

// 注销
export function logout() {
  return request.post<BaseRes>('/api/auth/logout')
}

// 获取用户信息
export function userInfo() {
  return request.post<UserRes>('/api/user/info')
}

// 文章列表
export function posts() {
  return request.get<ListRes>('/api/article/posts')
}

// 获取人员列表
export function listPerson(name = '') {
  return request.post<PersonList>('/api/person/list', { name })
}

// 获取人员信息
export function getPerson(id: string) {
  return request.post<GetPerson>('/api/person/detail', { id })
}

// 添加人员
export function addPerson(record: IPerson) {
  return request.post<BaseRes>('/api/person/add', record)
}

// 更新人员
export function updatePerson(record: IPerson) {
  return request.post<BaseRes>('/api/person/update', record)
}

// 删除人员
export function removePerson(id: string) {
  return request.post<BaseRes>('/api/person/remove', { id })
}
