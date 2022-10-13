const axios = require('axios').default
const { describe, it } = require('mocha')
const { expect } = require('chai')

const host = 'http://127.0.0.1:3000'
const account = 'admin'
const pwd = 'admin'
const baseUrl = `${host}/api/console`
const webBaseUrl = `${host}/api/web`
const searchUrl = `${baseUrl}/order/search`
const getUrl = `${baseUrl}/order/get`
const commitUrl = `${webBaseUrl}/order/commit`
let token = ''

describe('order api test', () => {
  before(async () => {
    const user = await axios.post(`${baseUrl}/auth/login`, {
      account,
      pwd
    })
    token = user.headers['set-cookie'][0].split(';')[0].split('=').pop()
  })
  it('search 没token时搜索', async () => {
    try {
      await axios.post(searchUrl, {
        pageIndex: 0,
        pageSize: 0,
        keyword: ''
      })
    } catch (err) {
      expect(err.response.data.stat).eq('USER_NOT_LOGIN')
    }
  })
  it('search pageIndex不是数字类型', async () => {
    try {
      await axios.post(
        searchUrl,
        {
          pageIndex: '',
          pageSize: 0,
          keyword: ''
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {
      expect(err.response.data.stat).eq('ERR_PARAMS')
    }
  })
  it('search pageSize不是数字类型', async () => {
    try {
      await axios.post(
        searchUrl,
        {
          pageIndex: 0,
          pageSize: '',
          keyword: ''
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {
      expect(err.response.data.stat).eq('ERR_PARAMS')
    }
  })
  it('search keyword不是字符串类型', async () => {
    try {
      await axios.post(
        searchUrl,
        {
          pageIndex: 0,
          pageSize: 0,
          keyword: 123
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {
      expect(err.response.data.stat).eq('ERR_PARAMS')
    }
  })
  it('search 正常搜索', async () => {
    try {
      const res = await axios.post(
        searchUrl,
        {
          pageIndex: 0,
          pageSize: 0,
          keyword: ''
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
      expect(res.data.stat).eq('ok')
    } catch (err) {}
  })
  it('get 订单id不存在', async () => {
    try {
      await axios.post(
        getUrl,
        {
          id: '33764293-f636-4292-89b1'
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {
      expect(err.response.data.stat).eq('ORDER_ID_NOT_FOUND')
    }
  })
  it('get 正常获取订单', async () => {
    try {
      const res = await axios.post(
        getUrl,
        {
          id: '33764293-f636-4292-89b1-238974bea06c'
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
      expect(res.data.stat).eq('ok')
    } catch (err) {}
  })
  it('commit 无富豪id', async () => {
    try {
      await axios.post(commitUrl, {
        richId: '',
        goodsIds: [
          {
            id: '13ea64dc-ed7d-4cbf-9572-7e1456fcf01c',
            count: 10
          }
        ]
      })
    } catch (err) {
      expect(err.response.data.stat).eq('ERR_PARAMS')
    }
  })
  it('commit 错误的富豪id', async () => {
    try {
      await axios.post(commitUrl, {
        richId: 'qweq',
        goodsIds: [
          {
            id: '13ea64dc-ed7d-4cbf-9572-7e1456fcf01c',
            count: 10
          }
        ]
      })
    } catch (err) {
      expect(err.response.data.stat).eq('RICHER_ID_NOT_FOUND')
    }
  })
  it('commit 订单总价超出富豪资产价', async () => {
    try {
      await axios.post(commitUrl, {
        richId: '4667491d-8b8b-4f47-a20f-a9c7beab74b3',
        goodsIds: [
          {
            id: '13ea64dc-ed7d-4cbf-9572-7e1456fcf01c',
            count: 10000000000000
          }
        ]
      })
    } catch (err) {
      expect(err.response.data.stat).eq('MONEY_NOT_ENOUGH')
    }
  })
  it('commit 订单中存在无id的商品', async () => {
    try {
      await axios.post(commitUrl, {
        richId: '4667491d-8b8b-4f47-a20f-a9c7beab74b3',
        goodsIds: [
          {
            id: '',
            count: 10
          }
        ]
      })
    } catch (err) {
      expect(err.response.data.stat).eq('GOODS_ID_NOT_FOUND')
    }
  })
  it('commit 提交订单', async () => {
    try {
      const res = await axios.post(commitUrl, {
        richId: '4667491d-8b8b-4f47-a20f-a9c7beab74b3',
        goodsIds: [
          {
            id: '13ea64dc-ed7d-4cbf-9572-7e1456fcf01c',
            count: 10
          }
        ]
      })
      expect(res.data.stat).eq('ok')
    } catch (err) {}
  })
})
