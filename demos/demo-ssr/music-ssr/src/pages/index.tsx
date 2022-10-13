import ReactDOM from 'react-dom/client'

import '../assets/global.css'
import styles from './style.module.css'
import SongItem from '../components/SongItem'
import useSongs from '../hooks/useSongs'
import { GetServerSideProps, ISong } from '../models/types'
import * as songService from '../services/song'

interface Props {
  items: ISong[]
  total: number
}

// 服务端数据预加载，前端执行时不会调用
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { data } = await songService.listSongs()
  return {
    props: {
      items: data.items,
      total: data.total
    },
    meta: {
      title: '音乐列表'
    }
  }
}

// 页面根组件
export default function Index(props: Props) {
  const { songs, hasMore, loadMore, listSongs } = useSongs(
    props.items,
    props.total
  )

  return (
    <div className="grid">
      <button onClick={listSongs} className={styles.button}>
        刷新列表
      </button>
      {songs.map(item => (
        <SongItem song={item} key={item._id} />
      ))}
      {hasMore ? (
        <button onClick={loadMore} className={styles.button}>
          加载更多
        </button>
      ) : (
        <div className={styles.text}>没有更多了</div>
      )}
    </div>
  )
}

// 该模块的代码会同时在两个端执行，这里需要先判断执行环境是否为浏览器
if (typeof window !== 'undefined') {
  const root = document.getElementById('root')
  const props = __STATE
  // 将服务端返回的数据和组件树注水，还原映射关系
  ReactDOM.hydrateRoot(root, <Index {...props} />)
}
