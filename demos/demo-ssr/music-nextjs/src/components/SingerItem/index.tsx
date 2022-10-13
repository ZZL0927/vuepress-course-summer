import Image from 'next/image'
import Link from 'next/link'

import styles from './style.module.scss'
import { ISinger } from '../../libs/models'

interface Props {
  singer: ISinger
}

export default function SingerItem({ singer }: Props) {
  return (
    <Link href={`/singer/${singer._id}`}>
      <div className={styles.wrap}>
        <Image
          src={singer.pic}
          width={40}
          height={40}
          className={styles.pic}
          alt=""
        />
        <div className={styles.title}>{singer.name}</div>
      </div>
    </Link>
  )
}
