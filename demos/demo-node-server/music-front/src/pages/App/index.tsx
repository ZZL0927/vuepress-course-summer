import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Main from '../Main'
import SongList from '../SongList'
import SingerList from '../SingerList'
import SingerDetail from '../SingerDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<SongList />} />
          <Route path="singers" element={<SingerList />} />
        </Route>
        <Route path="/singer/:_id" element={<SingerDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
