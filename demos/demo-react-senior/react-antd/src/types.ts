export type Gender = 'Male' | 'Female'

export interface IUser {
  username: string
  avatar: string
}

export interface IPerson {
  id?: string
  name: string
  gender: Gender
  phone: string
  email: string
  avatar: string
}

export interface IArticle {
  id: string
  title: string
  time: string
  avatar: string
  author: string
  banner: string
  likes: number
  comments: number
  content?: string
}