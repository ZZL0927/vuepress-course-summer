import { useMemo } from 'react'
import { Image, NavBar, Result } from 'antd-mobile'
import { useParams } from 'react-router-dom'

import styles from './style.module.scss'
import SongItem from '../../components/SongItem'
import useSinger from '../../hooks/useSinger'

export default function SingerDetail() {
  const { _id } = useParams()
  const { singer, songs, error } = useSinger(_id!)

  const content = useMemo(() => {
    if (error) {
      return <Result status="error" title="无法完成操作" description={error} />
    }
    return (
      <main className="main">
        <div className={styles.head}>
          <Image
            src={singer?.pic}
            width={100}
            height={100}
            className={styles.pic}
          />
          <div>{singer?.name}</div>
          {!!singer?.birthday && <div>{singer?.birthday}</div>}
        </div>
        <div className={styles.list}>
          {songs.map(item => (
            <SongItem song={item} key={item._id} />
          ))}
        </div>
      </main>
    )
  }, [error, singer, songs])

  return (
    <div className="page">
      <NavBar onBack={() => window.history.back()} className="navbar">
        {singer?.name}
      </NavBar>
      {content}
    </div>
  )
}
