import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'

import { ISinger } from '../libs/models'
import SingerItem from '../components/SingerItem'
import MainLayout from '../components/MainLayout'
import * as ssrService from '../services/ssr'

interface Props {
  items: ISinger[]
  total: number
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = await ssrService.singersProps()
  return props
}

const Singers: NextPage<Props> = ({ items }: Props) => {
  return (
    <MainLayout activeKey="/singers">
      <Head>
        <title>歌手列表</title>
        <meta name="description" content="Next.js Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid">
        {items.map(item => (
          <SingerItem singer={item} key={item._id} />
        ))}
      </div>
    </MainLayout>
  )
}

export default Singers
