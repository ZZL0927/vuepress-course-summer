import { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { TabBar } from 'antd-mobile'
import { PlayOutline, TeamOutline } from 'antd-mobile-icons'

interface Props {
  activeKey: string
}

export default function MainLayout(props: PropsWithChildren<Props>) {
  const router = useRouter()

  return (
    <div className="page">
      <main className="main">{props.children}</main>
      <TabBar
        safeArea
        className="navbar"
        activeKey={props.activeKey}
        onChange={key => router.push(key)}
      >
        <TabBar.Item key="/" icon={<PlayOutline />} title="歌曲" />
        <TabBar.Item key="/singers" icon={<TeamOutline />} title="歌手" />
      </TabBar>
    </div>
  )
}
