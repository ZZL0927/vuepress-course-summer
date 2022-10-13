import { useEffect } from 'react'
import { Toast } from 'antd-mobile'

import useSingers from '../../hooks/useSingers'
import SingerItem from '../../components/SingerItem'

export default function SingerList() {
  const { singers, error, listSingers } = useSingers()

  useEffect(() => {
    if (error) {
      Toast.show({
        content: error
      })
    }
  }, [error])

  useEffect(() => {
    listSingers()
  }, [listSingers])

  return (
    <div className="grid">
      {singers.map(item => (
        <SingerItem singer={item} key={item._id} />
      ))}
    </div>
  )
}
