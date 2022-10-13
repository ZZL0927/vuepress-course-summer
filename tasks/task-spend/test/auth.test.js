const axios = require('axios').default
const { describe, it } = require('mocha')
const { expect } = require('chai')

const host = 'http://127.0.0.1:3000'
const account = 'admin'
const pwd = 'admin'
const loginUrl = '/api/console/auth/login'
const logoutUrl = '/api/console/auth/logout'
const userInfoUrl = '/api/console/auth/getUserInfo'
let token = ''

describe('auth api test', () => {
  it('login 没有账号', async () => {
    try {
      await axios.post(host + loginUrl, {
        pwd
      })
    } catch (err) {
      expect(err.response.data.stat).eq('ERR_PARAMS')
    }
  })
  it('login 没有密码', async () => {
    try {
      await axios.post(host + loginUrl, {
        account
      })
    } catch (err) {
      expect(err.response.data.stat).eq('ERR_PARAMS')
    }
  })
  it('login 输入错误密码', async () => {
    try {
      await axios.post(host + loginUrl, {
        account,
        pwd: 'asdf'
      })
    } catch (err) {
      expect(err.response.data.stat).eq('ERR_PWD')
    }
  })
  it('login  输入不存在的账号', async () => {
    try {
      await axios.post(host + loginUrl, {
        account: 'asdf',
        pwd
      })
    } catch (err) {
      expect(err.response.data.stat).eq('ACCOUNT_NOT_FOUND')
    }
  })
  it('login 正常登陆', async () => {
    try {
      const item = await axios.post(host + loginUrl, {
        account,
        pwd
      })
      token = item.headers['set-cookie'][0].split(';')[0].split('=').pop()
      expect(item.data.stat).eq('ok')
    } catch (err) {}
  })
  it('getUserInfo 成功获取用户信息', async () => {
    try {
      const item = await axios.get(host + userInfoUrl, {
        headers: {
          Cookie: `token=${token}`
        }
      })
      expect(item.data.stat).eq('ok')
    } catch (err) {}
  })
  it('getUserInfo 没有token的情况下获取用户信息', async () => {
    try {
      await axios.get(host + userInfoUrl, {})
    } catch (err) {
      expect(err.response.data.stat).eq('USER_NOT_LOGIN')
    }
  })
  it('logout 没有token的情况下退出账号', async () => {
    try {
      await axios.post(host + logoutUrl)
    } catch (err) {
      expect(err.response.data.stat).eq('USER_NOT_LOGIN')
    }
  })
  it('logout 正常退出账号', async () => {
    try {
      const item = await axios.post(host + logoutUrl, {
        headers: {
          Cookie: `token=${token}`
        }
      })
      expect(item.data.stat).eq('ok')
    } catch (err) {}
  })
  it('logout 重复退出', async () => {
    try {
      await axios.post(host + logoutUrl, {
        headers: {
          Cookie: `token=${token}`
        }
      })
    } catch (err) {
      expect(err.response.data.stat).eq('USER_NOT_LOGIN')
    }
  })
})
