import classNames from 'classnames'
import { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import styles from './style.module.scss'
import { ReactComponent as IconAlbum } from '../../assets/imgs/album.svg'
import { ReactComponent as IconHeart } from '../../assets/imgs/heart.svg'
import { StoreProvider } from '../../hooks/store'
import Albums from '../Albums'
import Likes from '../Likes'

export default function App() {
  const [likes, setLikes] = useState<string[]>([])
  const tabs = useMemo(() => {
    return [
      {
        name: '专辑',
        link: '/',
        icon: IconAlbum
      },
      {
        name: '收藏',
        link: '/likes',
        icon: IconHeart
      }
    ]
  }, [])

  return (
    <StoreProvider value={{ likes, setLikes }}>
      <BrowserRouter>
        <div className={styles.app}>
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Albums />} />
              <Route path="/likes" element={<Likes />} />
            </Routes>
          </main>
          <div className={styles.footer}>
            {tabs.map((tab, i) => (
              <NavLink
                to={tab.link}
                className={({ isActive }) =>
                  classNames(styles.nav, {
                    [styles.active]: isActive
                  })
                }
                key={i}
              >
                <tab.icon />
                <span>{tab.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </BrowserRouter>
    </StoreProvider>
  )
}
