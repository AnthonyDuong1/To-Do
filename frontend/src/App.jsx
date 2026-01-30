import { useState } from 'react'
import { Outlet } from "react-router-dom"
import './App.css'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import InitialStuff from './components/InitialStuff.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
