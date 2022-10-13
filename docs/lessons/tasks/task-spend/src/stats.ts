export enum Status {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500
}

export class ReqStat {
  stat: string
  msg: string
  statusCode: number

  constructor(stat: string, msg: string, statusCode: number = Status.OK) {
    this.stat = stat
    this.msg = msg
    this.statusCode = statusCode
  }
}

export function badParams(message: string) {
  return new ReqStat('ERR_PARAMS', message, Status.BadRequest)
}

export const stats = {
  ERR_EXISTS: new ReqStat('ERR_EXISTS', '记录已存在', Status.Forbidden),
  ERR_NOT_FOUND: new ReqStat('ERR_NOT_FOUND', '记录不存在', Status.Forbidden),
  ACCOUNT_NOT_FOUND: new ReqStat(
    'ACCOUNT_NOT_FOUND',
    '账号不存在',
    Status.NotFound
  ),
  ERR_PWD: new ReqStat('ERR_PWD', '密码错误', Status.NotFound),
  ERR_LOGIN: new ReqStat('ERR_LOGIN', '登录失败', Status.NotFound),
  USER_NOT_LOGIN: new ReqStat(
    'USER_NOT_LOGIN',
    '用户未登录',
    Status.Unauthorized
  ),
  USER_LOGIN_OUTDATE: new ReqStat(
    'USER_LOGIN_OUTDATE',
    '用户登陆超时',
    Status.Unauthorized
  ),
  UPLOAD_ERROR: new ReqStat('UPLOAD_ERROR', '上传失败', Status.NotFound),
  GOODS_LIMIT_MUST_THANANDEQUAL_ZERO: new ReqStat(
    'GOODS_LIMIT_MUST_THANANDEQUALZERO',
    '商品最大限购量不能为负数',
    Status.MethodNotAllowed
  ),
  GOODS_ID_NOT_FOUND: new ReqStat(
    'GOODS_ID_NOT_FOUND',
    '商品ID不存在',
    Status.NotFound
  ),
  RICHER_ID_NOT_FOUND: new ReqStat(
    'RICHER_ID_NOT_FOUND',
    '富豪不存在',
    Status.NotFound
  ),
  ORDER_ID_NOT_FOUND: new ReqStat(
    'ORDER_ID_NOT_FOUND',
    '订单ID不存在',
    Status.NotFound
  ),
  MONEY_NOT_ENOUGH: new ReqStat(
    'MONEY_NOT_ENOUGH',
    '余额不足',
    Status.MethodNotAllowed
  )
}
