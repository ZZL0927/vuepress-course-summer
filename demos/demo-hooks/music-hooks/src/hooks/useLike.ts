import { useCallback, useContext } from 'react'
import { context } from './store'

export default function useLike() {
  const { likes, setLikes } = useContext(context)

  // 添加收藏
  const addLike = useCallback(
    (id: string) => {
      if (likes.includes(id) !== true) {
        setLikes([...likes, id])
      }
    },
    [likes, setLikes]
  )

  // 删除收藏
  const delLike = useCallback(
    (id: string) => {
      setLikes(likes.filter(item => item !== id))
    },
    [likes, setLikes]
  )

  return {
    likes,
    addLike,
    delLike
  }
}
