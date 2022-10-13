const axios = require('axios').default
const { describe, it } = require('mocha')
const { expect } = require('chai')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')

const host = 'http://127.0.0.1:3000'
const account = 'admin'
const pwd = 'admin'
const baseUrl = `${host}/api/console`
const uploadUrl = `${baseUrl}/form/upload`
let token = ''
describe('order api test', () => {
  before(async () => {
    const user = await axios.post(`${baseUrl}/auth/login`, {
      account,
      pwd
    })
    token = user.headers['set-cookie'][0].split(';')[0].split('=').pop()
  })
  it('upload 错误上传', async () => {
    try {
      let formData = new FormData()
      const staticPath = './login.png'
      let serverFilePath = path.join(__dirname, staticPath)
      let imgFile = fs.createReadStream(serverFilePath)
      formData.append('file', imgFile)
      const bd = '----WebKitFormBoundaryc7tFPB6Ml6rbVOsQ'
      const res = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': `multipart/form-data;boundary=${bd}`,
          Cookie: `token=${token}`
        }
      })
    } catch (err) {
      expect(err.response.data.stat).eq('UPLOAD_ERROR')
    }
  })
  it('upload 正确上传', async () => {
    try {
      let formData = new FormData()
      const staticPath = './login.png'
      let imgFile = fs.createReadStream(path.join(__dirname, staticPath))
      formData.append('file', imgFile)
      const res = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': `multipart/form-data;boundary=${formData._boundary}`,
          Cookie: `token=${token}`
        }
      })
      expect(res.data.stat).eq('ok')
    } catch (err) {}
  })
})
