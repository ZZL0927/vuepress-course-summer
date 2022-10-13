export interface ApiResp<T = any> {
  code: number
  message: string
  data: T
}

export enum SongStatus {
  Normal = 1,
  Disabled = 2
}

export interface ISong {
  _id: string
  title: string
  subtitle: string
  singer: {
    _id: string
    name: string
  }
  cover: string
  interval: number
  status: SongStatus
  createdAt: number
}

export interface ISinger {
  _id: string
  name: string
  birthday: string
  pic: string
}