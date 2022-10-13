import { useState } from 'react'

export default function Example7() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setTimeout(() => {
      setCount(count => count + 1)
    }, 2000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}