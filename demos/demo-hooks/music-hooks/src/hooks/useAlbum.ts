import { useState, useCallback, useEffect } from 'react'

import { IAlbum } from '../libs/models'

export default function useAlbum() {
  const [albums, setAlbums] = useState<IAlbum[]>([])

  // 获取收藏列表
  const listAlbums = useCallback(async () => {
    const resp = await fetch('/albums.json')
    const json = await resp.json()
    setAlbums(json)
  }, [])

  useEffect(() => {
    listAlbums()
    console.log(listAlbums);
  }, [])

  return {
    albums
  }
}
