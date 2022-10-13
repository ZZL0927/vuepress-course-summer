import * as request from './request.js'
import { ISong } from './types.js'

// 格式化时间显示
function timeFormat(interval: number) {
  let minutes = Math.floor(interval / 60)
    .toString()
    .padStart(2, '0')
  let seconds = (interval % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

async function run() {
  // 等待异步请求的json数据，通过泛型标记返回的数据类型为 ISong[]
  let songs = await request.get<ISong[]>('data/songs.json')
  let tpl = document.getElementById('tpl').innerHTML
  let html = songs
    .map(song => {
      // 这里的song会自动推导为ISong类型
      let time = timeFormat(song.interval)
      let singer = song.singer
        .map(item => `<a href="#" class="song-singer">${item}</a>`)
        .join('<span class="song-sep">/</span>')
      let result = tpl
        .replace('{{name}}', song.name)
        .replace('{{singer}}', singer)
        .replace('{{time}}', time)
        .replace('{{cover}}', song.cover)
      return result
    })
    .join('')
  document.querySelector('.songlist').innerHTML = html
}

run()
