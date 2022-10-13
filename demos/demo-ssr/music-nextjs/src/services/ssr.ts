import { ISinger, ISong } from '../libs/models'
import * as singerService from './singer'
import * as songService from './song'

/**
 * 获取主页props
 */
export async function indexProps() {
  try {
    const { code, data, message } = await songService.listSongs()
    if (code === 0) {
      return {
        props: {
          items: data.items,
          total: data.total
        }
      }
    }
    return {
      props: {
        error: message
      }
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        error: '服务器内部错误'
      }
    }
  }
}

/**
 * 获取歌手列表页props
 */
export async function singersProps() {
  try {
    const { code, data, message } = await singerService.listSingers()
    if (code === 0) {
      return {
        props: {
          items: data.items
        }
      }
    }
    return {
      props: {
        error: message
      }
    }
  } catch (error) {
    console.trace(error)
    return {
      props: {
        error: '服务器内部错误'
      }
    }
  }
}

/**
 * 获取歌手详情页props
 * @param _id
 */
export async function singerProps(_id: string) {
  try {
    let error = ''
    let songs: ISong[] = []
    let singer: ISinger | undefined
    const [songsResult, singerResult] = await Promise.all([
      songService.listSongs({
        singerId: _id
      }),
      singerService.getSinger(_id)
    ])
    if (songsResult.code === 0) {
      songs = songsResult.data.items
    } else {
      error = songsResult.message
    }
    if (singerResult.code === 0) {
      singer = singerResult.data.singer
    } else {
      error = singerResult.message
    }
    if (error || !singer) {
      return {
        props: {
          error
        }
      }
    }
    return {
      props: {
        songs,
        singer,
        error
      }
    }
  } catch (err: any) {
    return {
      props: {
        error: '服务器内部错误'
      }
    }
  }
}
