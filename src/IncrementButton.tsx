import { observable, action } from 'mobx'
import { Observer, useLocalStore } from 'mobx-react'

const store = observable({
  clickCount: 0,
})

const increment = action(() => store.clickCount++)

export default function IncrementButton() {
  // const data = useLocalStore(() => ({ clickCount: 0 }))
  return (
    <div>
      <Observer>{() => <p>You clicked {store.clickCount} times</p>}</Observer>
      <button onClick={() => increment()}>click me</button>
    </div>
  )
}
