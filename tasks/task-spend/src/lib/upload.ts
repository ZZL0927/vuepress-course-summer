const Busboy = require('busboy')
import * as path from 'path'
import { inspect } from 'util'
import * as fs from 'fs'
import * as uuid from 'uuid'
import { Context } from 'koa'
import { IUpload } from './../types'
import { Encoding } from 'crypto'

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
// 路径不存在就创建路径
export function mkdirsSync(dirname: string) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
// 获取上传文件的后缀名
function getSuffixName(fileName: string) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */

export function uploadFile(ctx: Context) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({ headers: req.headers })

  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result: IUpload = {
      success: false,
      formData: {} as any,
      message: '',
      fileName: ''
    }

    // 解析请求文件事件
    busboy.on(
      'file',
      function (
        fieldname: string,
        file: NodeJS.ReadableStream | undefined,
        filename: string,
        encoding: Encoding,
        mimetype: string
      ) {
        let fileName = uuid.v4() + path.extname(filename).toLowerCase()
        const staticPath = '../../data/static/images'
        let serverFilePath = path.join(__dirname, staticPath)
        mkdirsSync(serverFilePath)
        result.formData['url'] = `/images/${fileName}`
        // 文件保存到制定路径
        file.pipe(fs.createWriteStream(path.join(serverFilePath, fileName)))

        // 文件写入事件结束
        file.on('end', function () {
          result.success = true
          result.message = '文件上传成功'
          console.log(result.message)
          resolve(result)
        })
      }
    )

    // 解析表单中其他字段信息
    busboy.on(
      'field',
      function (
        fieldname: string,
        val: string,
        fieldnameTruncated?: string,
        valTruncated?: string,
        encoding?: string,
        mimetype?: string
      ) {
        console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val))
        result.formData[fieldname] = inspect(val)
      }
    )

    // 解析结束事件
    busboy.on('finish', function () {
      console.log('文件上传结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function (err: Error) {
      console.log('文件上传出错')
      reject(result)
    })

    req.pipe(busboy)
  })
}
