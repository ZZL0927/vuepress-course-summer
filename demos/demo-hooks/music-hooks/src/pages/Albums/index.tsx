import styles from './style.module.scss'
import AlbumItem from '../../components/AlbumItem'
import useAlbum from '../../hooks/useAlbum'
import useLike from '../../hooks/useLike'

export default function Albums() {
  const { albums } = useAlbum()
  const { likes, addLike, delLike } = useLike()

  return (
    <div className={styles.list}>
      {albums.map(item => (
        <AlbumItem
          album={item}
          liked={likes.includes(item.id)}
          key={item.id}
          onLikeChange={liked => {
            if (liked) addLike(item.id)
            else delLike(item.id)
          }}
        />
      ))}
    </div>
  )
}
