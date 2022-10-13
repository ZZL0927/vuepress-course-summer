/**
 * 统一JSON返回封装类
 */
export class JsonResp {
  code: number
  data?: any

  constructor(data?: any, code = 0) {
    this.data = data
    this.code = code
  }
}

/**
 * 错误状态
 */
export class ErrorStat extends JsonResp {
  message: string
  status: number

  constructor(code: number, message: string, status = 200) {
    super(undefined, code)
    this.message = message
    this.status = status
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message
    }
  }
}

/**
 * 业务状态错误码
 */
export const stats = {
  ErrSingerNotFound: new ErrorStat(20001, '找不到指定的歌手', 404),
  ErrSongNotEmpty: new ErrorStat(20002, '歌手存在关联的歌曲'),
  ErrSongNotFound: new ErrorStat(20003, '找不到指定的歌曲', 404),
  ErrSessionNotFound: new ErrorStat(40001, '会话不存在')
}
