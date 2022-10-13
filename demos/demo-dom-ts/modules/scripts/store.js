// 导入user模块的默认导出成员
import User from './user.js'

// _users是模块内部私有成员，不会和其他模块出现命名冲突
let _users = []

// 导出addUser方法
export function addUser(name) {
  let user = new User()
  user.setName(name)
  _users.push(user)
}

// 导出getUserCount方法
export function getUserCount() {
  return _users.length
}