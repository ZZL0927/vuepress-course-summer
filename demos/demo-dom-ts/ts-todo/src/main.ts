import { ITodo, Todo } from './types.js'

// 列表容器DOM节点
let list = document.getElementById('todos')
// Todo列表数据容器
let todos: Todo[] = []

// 创建每一条Todo对应的DOM对象
function createEl(item: Todo) {
  let className = 'todo-item'
  if (item.finished === true) className += ' todo-finished'
  let el = document.createElement('div')
  el.className = className
  let checkbox = document.createElement('i')
  checkbox.className = 'iconfont icon-checkbox'
  // 绑定事件
  checkbox.addEventListener('click', () => toggleItem(item))
  let content = document.createElement('span')
  content.className = 'todo-title'
  content.innerText = item.content
  let close = document.createElement('i')
  close.className = 'iconfont icon-delete'
  // 绑定事件
  close.addEventListener('click', () => delItem(item))
  el.appendChild(checkbox)
  el.appendChild(content)
  el.appendChild(close)
  item.el = el
  return el
}

// 导出数据到localStorage
function dump() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// 添加Todo条目
function addItem(item: Todo, isInit = false) {
  todos.push(item)
  let el = createEl(item)
  list.appendChild(el)
  if (isInit === false) dump()
}

// 切换Todo条目状态
function toggleItem(item: Todo) {
  item.finished = !item.finished
  let className = 'todo-item'
  if (item.finished === true) className += ' todo-finished'
  item.el.className = className
  dump()
}

// 删除Todo条目
function delItem(item: Todo) {
  list.removeChild(item.el)
  let index = todos.indexOf(item)
  todos.splice(index, 1)
  dump()
}

// 监听输入框的回车事件，添加条目
let input = document.getElementById('input') as HTMLInputElement
input.addEventListener('keydown', event => {
  let value = input.value.trim()
  if (event.key === 'Enter' && value !== '') {
    let todo = new Todo({ content: value, finished: false })
    addItem(todo)
    input.value = ''
  }
})

// 加载localStorage中的缓存数据
let _todos = localStorage.getItem('todos')
if (_todos) {
  try {
    // 缓存中的数据只有 content、finished 属性，没有el，对应的是ITodo接口而不是Todo
    let items: ITodo[] = JSON.parse(_todos)
    for (let item of items) {
      let todo = new Todo(item)
      addItem(todo, true)
    }
  } catch (error) {
    console.error('invalid cache')
  }
}
