import { useMemo } from 'react'

import styles from '../Albums/style.module.scss'
import AlbumItem from '../../components/AlbumItem'
import useAlbum from '../../hooks/useAlbum'
import useLike from '../../hooks/useLike'

export default function Likes() {
  const { albums } = useAlbum()
  const { likes, delLike } = useLike()

  const items = useMemo(() => {
    return albums.filter(item => likes.includes(item.id))
  }, [albums, likes])

  return (
    <div className={styles.list}>
      {items.map(item => (
        <AlbumItem
          album={item}
          liked
          key={item.id}
          onLikeChange={() => delLike(item.id)}
        />
      ))}
    </div>
  )
}
