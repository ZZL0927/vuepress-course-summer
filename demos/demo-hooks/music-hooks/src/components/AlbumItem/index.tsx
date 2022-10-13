import classNames from 'classnames'

import styles from './style.module.scss'
import { IAlbum } from '../../libs/models'
import { ReactComponent as IconStar } from '../../assets/imgs/star.svg'
import { ReactComponent as IconStarFill } from '../../assets/imgs/star_fill.svg'

interface Props {
  album: IAlbum
  liked: boolean
  onLikeChange: (liked: boolean) => void
}

export default function AlbumItem({ album, liked, onLikeChange }: Props) {
  return (
    <div className={styles.wrap}>
      <img src={album.photo} alt="" className={styles.cover} />
      <div className={styles.main}>
        <div className={styles.title}>{album.name}</div>
        <div>{album.singer}</div>
        <div>{album.time}</div>
      </div>
      {liked ? (
        <IconStarFill
          className={classNames(styles.star, styles.liked)}
          onClick={() => onLikeChange(false)}
        />
      ) : (
        <IconStar className={styles.star} onClick={() => onLikeChange(true)} />
      )}
    </div>
  )
}
