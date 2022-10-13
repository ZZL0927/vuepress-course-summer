import { useRef } from 'react'

export default function Example4() {
  const input = useRef<HTMLInputElement>(null)

  const focus = () => {
    input.current?.focus()
  }

  return (
    <div>
      <button onClick={focus}>Focus</button>
      <input type="text" ref={input} />
    </div>
  )
}
