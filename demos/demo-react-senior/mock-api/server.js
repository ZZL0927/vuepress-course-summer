const fs = require('fs')
const path = require('path')
const http = require('http')
const crypto = require('crypto')

const admin = {
  username: 'admin',
  avatar: 'https://cdn.fakercloud.com/avatars/michzen_128.jpg',
  password: '123456'
}
const personJSON = path.join(__dirname, 'persons.json')

let persons = []
let tokens = new Set()

try {
  persons = JSON.parse(
    fs.readFileSync(personJSON, 'utf-8')
  )
} catch (error) {}

function dump() {
  fs.writeFileSync(personJSON, JSON.stringify(persons, null, 2))
}

// 登录
function login(req, res) {
  let username = req.body.username
  let password = req.body.password
  if (username !== admin.username || password !== admin.password) {
    return {
      stat: 'LOGIN_FAILED',
      message: '用户名或密码不正确'
    }
  }
  let token = crypto.randomBytes(8).toString('hex')
  tokens.add(token)
  res.setHeader('Set-Cookie', `token=${token}; path=/; httpOnly`)
  return {
    stat: 'OK'
  }
}

// 注销
function logout(req, res) {
  let token = req.cookies.token
  tokens.delete(token)
  res.setHeader('Set-Cookie', `token=; path=/; expires=${new Date().toUTCString()}; httpOnly`)
  return {
    stat: 'OK'
  }
}

// 获取用户信息
function getUser() {
  return {
    stat: 'OK',
    user: {
      username: admin.username,
      avatar: admin.avatar
    }
  }
}

// 用户列表
function listPerson(req) {
  let name = req.body.name || ''
  return {
    stat: 'OK',
    rows: persons.filter(person => person.name.includes(name))
  }
}

// 获取人员信息
function getPerson(req) {
  let id = req.body.id
  let record = persons.find(person => person.id === id)
  if (record) {
    return {
      stat: 'OK',
      data: record
    }
  } else {
    return {
      stat: 'NOT_FOUND',
      message: '找不到记录'
    }
  }
}

// 添加用户
function addPerson(req) {
  let body = req.body
  if (body.name.length < 2) {
    return {
      stat: 'ERR_BAD_PARAMS',
      message: '名字长度不能小于2'
    }
  }
  let record = {
    id: crypto.randomBytes(4).toString('hex'),
    name: body.name,
    gender: body.gender,
    phone: body.phone,
    email: body.email,
    avatar: body.avatar
  }
  persons.unshift(record)
  dump()
  return {
    stat: 'OK'
  }
}

// 更新用户
function updatePerson(req) {
  let body = req.body
  let record = {
    id: body.id,
    name: body.name,
    gender: body.gender,
    phone: body.phone,
    email: body.email,
    avatar: body.avatar
  }
  let index = persons.findIndex(person => person.id === body.id)
  persons.splice(index, 1, record)
  dump()
  return {
    stat: 'OK'
  }
}

// 删除用户
function removePerson(req) {
  let index = persons.findIndex(person => person.id === req.body.id)
  persons.splice(index, 1)
  dump()
  return {
    stat: 'OK'
  }
}

// 检查登录
function checkLogin(req) {
  let token = req.cookies.token
  return tokens.has(token)
}

const routes = {
  '/api/auth/login': login,
  '/api/auth/logout': logout,
  '/api/user/info': getUser,
  '/api/person/list': listPerson,
  '/api/person/add': addPerson,
  '/api/person/update': updatePerson,
  '/api/person/remove': removePerson,
  '/api/person/detail': getPerson
}

const server = http.createServer((req, res) => {
  let [reqPath] = req.url.split('?')
  req.cookies = {}
  let cookies = req.headers.cookie || ''
  let tmp = cookies.split(';')
  for (let item of tmp) {
    let arr = item.split('=').map(key => key.trim())
    if (arr[0] && arr[1]) req.cookies[arr[0]] = arr[1]
  }
  let chunks = []
  req.on('data', chunk => chunks.push(chunk))
  req.on('end', () => {
    try {
      let data = Buffer.concat(chunks).toString('utf-8')
      req.body = JSON.parse(data)
    } catch (error) {
      req.body = {}
    }
    try {
      for (let route in routes) {
        if (route === reqPath) {
          if (reqPath.startsWith('/api/auth/') === false && checkLogin(req) === false) {
            return res.end(JSON.stringify({
              stat: 'NOT_LOGIN',
              message: '用户未登录'
            }))
          }
          let result = routes[route](req, res)
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(result))
        }
      }
      res.statusCode = 404
    } catch (error) {
      console.trace(error)
      res.statusCode = 500
    } finally {
      res.end()
    }
  })
})

server.listen(3361, () => console.log(3361))