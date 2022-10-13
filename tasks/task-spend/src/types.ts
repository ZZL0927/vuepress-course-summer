export interface IAdmin {
  account: string
  pwd: string
}

export interface IGoods {
  title: string
  price: number
  cover: string
  id: string
  status: number
  limit: number
  weight: number
  ctime: number
}

export interface IGoodsIds {
  id: string
  count: number
}

export interface IRicher {
  nickname: string
  worth: number
  avatar: string
  id: string
  status: number
}

export interface IOrder {
  richer: IRicher
  goods: {
    item: IGoods
    count: number
  }[]
  ctime: number
  id: string
}

export interface IUpload {
  formData: any
  success?: boolean
  message?: string
  fileName?: string
}
