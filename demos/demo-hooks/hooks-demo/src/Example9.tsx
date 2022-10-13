import { useState, useEffect } from 'react'

export default function Example9() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('new effect')
    const timer = setInterval(() => {
      console.log(count, Date.now())
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [count])

  return (
    <div>
      <p>Count {count}</p>
    </div>
  )
}