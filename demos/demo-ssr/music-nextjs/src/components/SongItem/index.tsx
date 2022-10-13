import dayjs from 'dayjs'
import Image from 'next/image'

import styles from './style.module.scss'
import { ISong } from '../../libs/models'

interface Props {
  song: ISong
}

export default function SongItem({ song }: Props) {
  return (
    <div className={styles.wrap}>
      <Image
        src={song.cover}
        width={100}
        height={100}
        className={styles.cover}
        alt=""
      />
      <div className={styles.main}>
        <div className={styles.title}>{song.title}</div>
        <div>{song.singer.name}</div>
        <div>{dayjs(song.createdAt).format('YYYY-MM-DD')}</div>
      </div>
    </div>
  )
}
