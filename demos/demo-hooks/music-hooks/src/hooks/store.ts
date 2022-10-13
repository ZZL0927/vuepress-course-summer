import { createContext } from 'react'

interface StoreContext {
  likes: string[]
  setLikes: (likes: string[]) => void
}

const context = createContext<StoreContext>({
  likes: [],
  setLikes: () => {}
})
const StoreProvider = context.Provider

export { context, StoreProvider }
