import { Image } from 'antd-mobile'
import { Link } from 'react-router-dom'

import styles from './style.module.scss'
import { ISinger } from '../../libs/models'

interface Props {
  singer: ISinger
}

export default function SingerItem({ singer }: Props) {
  return (
    <Link to={`/singer/${singer._id}`} className={styles.wrap}>
      <Image src={singer.pic} width={40} height={40} className={styles.pic} />
      <div className={styles.title}>{singer.name}</div>
    </Link>
  )
}
