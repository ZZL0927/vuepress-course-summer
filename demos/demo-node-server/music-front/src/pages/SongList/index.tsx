import { PullToRefresh, InfiniteScroll, Toast } from 'antd-mobile'

import SongItem from '../../components/SongItem'
import useSongs from '../../hooks/useSongs'
import { useEffect } from 'react'

export default function SongList() {
  const { songs, error, hasMore, listSongs, loadMore } = useSongs()

  useEffect(() => {
    if (error) {
      Toast.show({
        content: error
      })
    }
  }, [error])

  return (
    <PullToRefresh onRefresh={listSongs}>
      <div className="grid">
        {songs.map(item => (
          <SongItem song={item} key={item._id} />
        ))}
      </div>
      <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
    </PullToRefresh>
  )
}
