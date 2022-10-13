import { useState, useEffect } from 'react'

export default function Example8() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count, Date.now())
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <p>Count {count}</p>
    </div>
  )
}
