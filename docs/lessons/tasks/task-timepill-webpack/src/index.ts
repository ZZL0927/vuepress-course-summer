import * as dayjs from 'dayjs'
import './styles/index.css'
interface ITest {
  name: string
}
const test: ITest = {
  name: 'a'
}
const _html = document.getElementById('id') as HTMLInputElement
console.log(_html)
console.log(test)
console.log(dayjs().format())
// husky
interface IUser {
  age: number
  name?: string
}
const user: IUser = {
  age: 10
}
function test1 (user?: IUser) {
  return user!.name
}

test1()
