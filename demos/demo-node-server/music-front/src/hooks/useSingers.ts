import { useState, useCallback } from 'react'
import { ISinger } from '../libs/models'
import * as singerService from '../services/singer'

export default function useSingers() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [singers, setSingers] = useState<ISinger[]>([])

  const listSingers = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, code, message } = await singerService.listSingers()
      if (code === 0) {
        setSingers(data.items)
      } else {
        setError(message)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    error,
    loading,
    singers,
    listSingers
  }
}
