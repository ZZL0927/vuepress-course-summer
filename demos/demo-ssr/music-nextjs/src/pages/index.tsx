import { useEffect } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { PullToRefresh, InfiniteScroll, Toast } from 'antd-mobile'

import { ISong } from '../libs/models'
import SongItem from '../components/SongItem'
import MainLayout from '../components/MainLayout'
import useSongs from '../hooks/useSongs'
import * as ssrService from '../services/ssr'

interface Props {
  items: ISong[]
  total: number
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = await ssrService.indexProps()
  return props
}

const Home: NextPage<Props> = props => {
  const { songs, hasMore, error, loadMore, listSongs } = useSongs(
    props.items,
    props.total
  )

  useEffect(() => {
    if (error) {
      Toast.show({
        content: error
      })
    }
  }, [error])

  return (
    <MainLayout activeKey="/">
      <Head>
        <title>歌曲列表</title>
        <meta name="description" content="Next.js Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PullToRefresh onRefresh={listSongs}>
        <div className="grid">
          {songs.map(item => (
            <SongItem song={item} key={item._id} />
          ))}
        </div>
        <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
      </PullToRefresh>
    </MainLayout>
  )
}

export default Home
