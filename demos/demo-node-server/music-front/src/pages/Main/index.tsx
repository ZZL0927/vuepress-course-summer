import { TabBar } from 'antd-mobile'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PlayOutline, TeamOutline } from 'antd-mobile-icons'

export default function Main() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="page">
      <main className="main">{<Outlet />}</main>
      <TabBar
        safeArea
        className="navbar"
        activeKey={location.pathname}
        onChange={key => navigate(key)}
      >
        <TabBar.Item key="/" icon={<PlayOutline />} title="歌曲" />
        <TabBar.Item key="/singers" icon={<TeamOutline />} title="歌手" />
      </TabBar>
    </div>
  )
}
