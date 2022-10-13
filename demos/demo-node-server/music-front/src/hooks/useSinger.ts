import { useState, useCallback, useEffect } from 'react'
import { ISinger, ISong } from '../libs/models'
import * as singerService from '../services/singer'
import * as songService from '../services/song'

export default function useSinger(_id: string) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [singer, setSinger] = useState<ISinger>()
  const [songs, setSongs] = useState<ISong[]>([])

  const getSinger = useCallback(async () => {
    try {
      setLoading(true)
      setSinger(undefined)
      const { data, code, message } = await singerService.getSinger(_id)
      if (code === 0) {
        setSinger(data.singer)
      } else {
        setError(message)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [_id])

  const listSongs = useCallback(async () => {
    try {
      setLoading(true)
      setSinger(undefined)
      const { data, code, message } = await songService.listSongs({
        singerId: _id
      })
      if (code === 0) {
        setSongs(data.items)
      } else {
        setError(message)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [_id])

  useEffect(() => {
    getSinger()
    listSongs()
  }, [getSinger, listSongs])

  return {
    error,
    loading,
    singer,
    songs,
    getSinger,
    listSongs
  }
}
