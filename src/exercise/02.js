// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [value, setValue] = React.useState(() => {
    if (window.localStorage.get(key)) {
      return deserialize(window.localStorage.get(key))
    }
    return defaultValue
  })

  React.useEffect(() => {
    serialize(key, JSON.stringify(value))
  }, [key, value, serialize])

  return {value, setValue}
}

function Greeting({initialName = ''}) {
  const {name, setName} = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
