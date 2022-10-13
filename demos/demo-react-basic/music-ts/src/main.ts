import * as request from './request.js'
import { IArea, IAlbum, Area, Album } from './types.js'

// 当前选中的area id
let currentArea: number
let areas: Area[] = []
let albums: Album[] = []

// 请求json数据
async function load() {
  let [_areas, _albums] = await Promise.all([
    request.get<IArea[]>('data/areas.json'),
    request.get<IAlbum[]>('data/albums.json')
  ])
  areas = _areas.map(obj => new Area(obj))
  albums = _albums.map(obj => new Album(obj))
  // 设置当前选中第一个tab
  currentArea = areas[0].id
}

// 切换tab
function changeTab(id: number) {
  currentArea = id
  for (let area of areas) {
    if (area.id === id) area.el.className = 'tab-item tab-active'
    else area.el.className = 'tab-item'
  }
  createList()
}

// 创建tabs
function createTabs() {
  let tabs = document.querySelector('.tabs')
  for (let area of areas) {
    let li = document.createElement('li')
    li.className = 'tab-item'
    if (area.id === currentArea) li.className += ' tab-active'
    li.innerText = area.name
    li.addEventListener('click', () => changeTab(area.id))
    tabs.appendChild(li)
    area.el = li
  }
}

// 删除专辑
function deleteAlbum(album: Album) {
  album.el.parentNode.removeChild(album.el)
  let index = albums.indexOf(album)
  albums.splice(index, 1)
}

// 创建列表
function createList() {
  let list = document.querySelector('.list')
  let rows = albums.filter(item => item.area === currentArea)
  // 创建fragment，一次性插入
  let fragment = document.createDocumentFragment()
  for (let row of rows) {
    if (row.el === null) {
      let album = document.createElement('div')
      album.className = 'album'
      let cover = document.createElement('cover')
      cover.className = 'cover'
      let img = document.createElement('img')
      img.src = row.cover
      cover.appendChild(img)
      let mask = document.createElement('div')
      mask.className = 'mask'
      let deleteIcon = document.createElement('img')
      deleteIcon.src = 'imgs/delete.png'
      deleteIcon.addEventListener('click', () => deleteAlbum(row))
      mask.appendChild(deleteIcon)
      cover.appendChild(mask)
      album.appendChild(cover)
      let name = document.createElement('a')
      name.className = 'title nowrap'
      name.href = '#'
      name.innerText = row.name
      album.appendChild(name)
      let singer = document.createElement('a')
      singer.href = '#'
      singer.innerText = row.singer
      album.appendChild(singer)
      let date = document.createElement('div')
      date.innerText = row.release_time
      album.appendChild(date)
      row.el = album
    }
    fragment.appendChild(row.el)
  }
  list.innerHTML = ''
  list.appendChild(fragment)
}

async function run() {
  // 先等待数据加载完毕
  await load()
  createTabs()
  createList()
}

run()