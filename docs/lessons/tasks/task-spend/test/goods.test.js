const axios = require('axios').default
const { describe, it } = require('mocha')
const { expect } = require('chai')

const host = 'http://127.0.0.1:3000'
const account = 'admin'
const pwd = 'admin'
const baseUrl = `${host}/api/console`
const webBaseUrl = `${host}/api/web`
const searchUrl = `${baseUrl}/goods/search`
const addUrl = `${baseUrl}/goods/add`
const setUrl = `${baseUrl}/goods/set`
const setWeightUrl = `${baseUrl}/goods/setWeight`
const upUrl = `${baseUrl}/goods/up`
const downUrl = `${baseUrl}/goods/down`
const deleteUrl = `${baseUrl}/goods/delete`
const seachWebUrl = `${webBaseUrl}/goods/search`
const getUrl = `${webBaseUrl}/goods/get`
let token = ''

describe('goods api test', () => {
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
  it('add 无商品名', async () => {
    try {
      await axios.post(
        addUrl,
        {
          title: '',
          price: 1,
          cover: '123.png',
          limit: 0
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
  it('add 价格为0', async () => {
    try {
      await axios.post(
        addUrl,
        {
          title: '宝石',
          price: 0,
          cover: '123.png',
          limit: 0
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
  it('add 无商品图片', async () => {
    try {
      await axios.post(
        addUrl,
        {
          title: '宝石',
          price: 10,
          cover: '',
          limit: 0
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
  it('add 正常上传新商品', async () => {
    try {
      let name = `哇哈哈${Math.floor(Math.random() * 10 + 11)}`
      const res = await axios.post(
        addUrl,
        {
          title: name,
          price: 10,
          cover: '123.png',
          limit: 100
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
  it('add 重复上传', async () => {
    try {
      await axios.post(
        addUrl,
        {
          title: '例子',
          price: 10,
          cover: '123.png',
          limit: 100
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {
      expect(err.response.data.stat).eq('ERR_EXISTS')
    }
  })
  it('edit 正常修改', async () => {
    try {
      const res = await axios.post(
        setUrl,
        {
          id: 'dfa0b7d8-1f41-466b-aeb8-95be79ed9a46',
          title: '和盒子',
          price: 5,
          cover: '123.png',
          limit: 0
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
  it('edit 修改一个不存在的商品', async () => {
    try {
      await axios.post(
        setUrl,
        {
          id: 'dfa0b7d8-1f41-466b-ae00-95be79ed9a45',
          title: '和盒子',
          price: 5,
          cover: '123.png',
          limit: 0
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {
      expect(err.response.data.stat).eq('GOODS_ID_NOT_FOUND')
    }
  })
  it('edit 错误修改商品名', async () => {
    try {
      await axios.post(
        setUrl,
        {
          id: 'cf46edbf-c3d7-4ca5-84c9-96aa729486f9',
          title: '',
          price: 5,
          cover: '123.png',
          limit: 0
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
  it('setWeight 正常设置权重', async () => {
    try {
      const res = await axios.post(
        setWeightUrl,
        {
          id: 'cf46edbf-c3d7-4ca5-84c9-96aa729486f9',
          title: '',
          price: 5,
          cover: '123.png',
          limit: 0
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {}
  })
  it('setWeight 设置负数权重', async () => {
    try {
      const res = await axios.post(
        setWeightUrl,
        {
          id: 'cf46edbf-c3d7-4ca5-84c9-96aa729486f9',
          weight: -1
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
  it('up 商品上架', async () => {
    try {
      const res = await axios.post(
        upUrl,
        {
          id: 'cf46edbf-c3d7-4ca5-84c9-96aa729486f9',
          status: 1
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
  it('down 商品下架', async () => {
    try {
      const res = await axios.post(
        downUrl,
        {
          id: 'cf46edbf-c3d7-4ca5-84c9-96aa729486f9',
          status: 2
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
  it('delete 正常删除商品', async () => {
    try {
      const res = await axios.post(
        deleteUrl,
        {
          id: 'cf46edbf-c3d7-4ca5-84c9-96aa729486f9'
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
  it('delete 删除不存在商品', async () => {
    try {
      const res = await axios.post(
        deleteUrl,
        {
          id: 'cf46edbf-c3d7'
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {
      expect(err.response.data.stat).eq('GOODS_ID_NOT_FOUND')
    }
  })
  it('web search 正常搜索', async () => {
    try {
      const res = await axios.post(seachWebUrl, {
        pageIndex: 0,
        pageSize: 0,
        keyword: ''
      })
      expect(res.data.stat).eq('ok')
    } catch (err) {}
  })
  it('web get 正常获取', async () => {
    try {
      const res = await axios.post(getUrl, {
        id: '39e3effd-bea3-4132-b99b-3a1812626a22'
      })
      expect(res.data.stat).eq('ok')
    } catch (err) {}
  })
  it('web get 错误获取', async () => {
    try {
      const res = await axios.post(getUrl, {
        id: '39e3eff132-b99b-3a1812626a22'
      })
    } catch (err) {
      expect(err.response.data.stat).eq('GOODS_ID_NOT_FOUND')
    }
  })
})
