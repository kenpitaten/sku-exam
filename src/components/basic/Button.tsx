import { useState } from 'react'

function Button() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button className=''>{count}</button>
    </>
  )
}

export default Button
