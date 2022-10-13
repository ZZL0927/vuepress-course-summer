import { useMemo } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { NavBar } from 'antd-mobile'

import styles from '../../styles/Singer.module.scss'
import SongItem from '../../components/SongItem'
import { ISinger, ISong } from '../../libs/models'
import * as ssrService from '../../services/ssr'

interface Props {
  songs?: ISong[]
  singer?: ISinger
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const _id = ctx.query._id as string
  const props = await ssrService.singerProps(_id)
  return props
}

export default function SingerDetail({ songs, singer }: Props) {
  const content = useMemo(() => {
    return (
      <main className="main">
        <div className={styles.head}>
          <Image
            src={singer!.pic}
            width={100}
            height={100}
            className={styles.pic}
            alt=""
          />
          <div>{singer?.name}</div>
          {!!singer?.birthday && <div>{singer?.birthday}</div>}
        </div>
        <div className={styles.list}>
          {songs!.map(item => (
            <SongItem song={item} key={item._id} />
          ))}
        </div>
      </main>
    )
  }, [singer, songs])

  const title = useMemo(() => {
    if (singer) return singer.name
    return '歌手详情'
  }, [singer])

  return (
    <div className="page">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Next.js Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar onBack={() => window.history.back()} className="navbar">
        {title}
      </NavBar>
      {content}
    </div>
  )
}
