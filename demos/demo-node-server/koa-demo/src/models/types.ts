import { ObjectId } from 'mongodb'

// 歌曲状态，枚举类型
export enum SongStatus {
  Normal = 1,
  Disabled = 2
}

// 歌手
export interface ISinger {
  name: string
  birthday: string
  pic: string
}

// 歌曲
export interface ISong {
  title: string
  subtitle: string
  singerId: ObjectId
  cover: string
  interval: number
  status: SongStatus
  createdAt: number
}
