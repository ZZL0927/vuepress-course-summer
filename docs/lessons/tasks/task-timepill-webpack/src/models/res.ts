import { ITimePill } from './types'

export interface IBaseRes {
  stat: string
  msg?: string
}

export interface IAddRes extends IBaseRes {
  data: string
}

export interface IGetRes extends IBaseRes {
  data: ITimePill
}

// export interface 
