const axios = require('axios').default
const { describe, it } = require('mocha')
const { expect } = require('chai')

const host = 'http://127.0.0.1:3000'
const account = 'admin'
const pwd = 'admin'
const baseUrl = `${host}/api/console`
const webBaseUrl = `${host}/api/web`
const searchUrl = `${baseUrl}/rich/search`
const addUrl = `${baseUrl}/rich/add`
const setUrl = `${baseUrl}/rich/set`
const deleteUrl = `${baseUrl}/rich/delete`
const seachWebUrl = `${webBaseUrl}/rich/search`
const getUrl = `${webBaseUrl}/rich/get`
let token = ''

describe('rich api test', () => {
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
  it('add 无用户名', async () => {
    try {
      await axios.post(
        addUrl,
        {
          nickname: '',
          worth: 10000000,
          avatar: '/images/11e06722-9bfa-4c4b-ae4f-07995298ab27.png'
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
  it('add 资产为0', async () => {
    try {
      await axios.post(
        addUrl,
        {
          nickname: '绝决字',
          worth: 0,
          avatar: '/images/11e06722-9bfa-4c4b-ae4f-07995298ab27.png'
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
  it('add 无用户图片', async () => {
    try {
      await axios.post(
        addUrl,
        {
          nickname: '纠结',
          worth: 10000000,
          avatar: ''
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
  it('add 正常新增富豪', async () => {
    try {
      const res = await axios.post(
        addUrl,
        {
          nickname: '纠结',
          worth: 10000000,
          avatar: '/images/11e06722-9bfa-4c4b-ae4f-07995298ab27.png'
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
  it('edit 正常修改', async () => {
    try {
      const res = await axios.post(
        setUrl,
        {
          id: '1c04af06-2211-4bf1-8525-f6ad4a64ab24',
          nickname: 'Lily',
          worth: 1000000000,
          avatar: '/images/11e06722-9bfa-4c4b-ae4f-07995298ab27.png'
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
  it('edit 修改一个不存在的富豪', async () => {
    try {
      await axios.post(
        setUrl,
        {
          id: 'dfa0b7d8-1f41-466b-ae00-95be79ed9a45',
          nickname: 'Lily',
          worth: 1000000000,
          avatar: '/images/11e06722-9bfa-4c4b-ae4f-07995298ab27.png'
        },
        {
          headers: {
            Cookie: `token=${token}`
          }
        }
      )
    } catch (err) {
      expect(err.response.data.stat).eq('RICHER_ID_NOT_FOUND')
    }
  })
  it('edit 错误修改富豪名', async () => {
    try {
      await axios.post(
        setUrl,
        {
          id: '1c04af06-2211-4bf1-8525-f6ad4a64ab24',
          nickname: '',
          worth: 1000000000,
          avatar: '/images/11e06722-9bfa-4c4b-ae4f-07995298ab27.png'
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
  it('delete 正常删除富豪', async () => {
    try {
      const res = await axios.post(
        deleteUrl,
        {
          id: '1c04af06-2211-4bf1-8525-f6ad4a64ab24'
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
  it('delete 删除不存在的富豪', async () => {
    try {
      await axios.post(
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
      expect(err.response.data.stat).eq('RICHER_ID_NOT_FOUND')
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
        id: '1c04af06-2211-4bf1-8525-f6ad4a64ab24'
      })
      expect(res.data.stat).eq('ok')
    } catch (err) {}
  })
  it('web get 错误获取', async () => {
    try {
      await axios.post(getUrl, {
        id: '1c04af06-2211-4bf1-8525'
      })
    } catch (err) {
      expect(err.response.data.stat).eq('RICHER_ID_NOT_FOUND')
    }
  })
})
