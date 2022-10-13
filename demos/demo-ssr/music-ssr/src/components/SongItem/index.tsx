import dayjs from 'dayjs'

import styles from './style.module.css'
import { ISong } from '../../models/types'

interface Props {
  song: ISong
}

export default function SongItem({ song }: Props) {
  return (
    <div className={styles.wrap}>
      <img
        src={song.cover}
        width={100}
        height={100}
        className={styles.cover}
      />
      <div className={styles.main}>
        <div className={styles.title}>{song.title}</div>
        <div>{song.singer.name}</div>
        <div>{dayjs(song.createdAt).format('YYYY-MM-DD')}</div>
      </div>
    </div>
  )
}