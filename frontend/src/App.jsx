import { useState } from 'react'
import './App.css'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import InitialStuff from './components/InitialStuff.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
    </>
  )
}

export default App
