import { useState, useEffect } from 'react'

export default function Example3() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)

  useEffect(() => {
    console.log(count)
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Value {value}</p>
      <button onClick={() => setValue(value + 1)}>Increase</button>
    </div>
  )
}
