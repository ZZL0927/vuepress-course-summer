// 通过相对路径导入其他模块，有多个导出方法，可以使用*导出到一个命名空间store
import * as store from './store.js'
// 或者使用下面解构的写法
// import { addUser, getUserCount } from './store.js'

// _name和_users都是模块内部私有成员
let _name = 'Tom'
let _users = 0

// 调用store模块导出的方法addUser
store.addUser(_name)
// 调用store模块导出的方法getUserCount
_users = store.getUserCount()
console.log(_users)