import { useState } from 'react'
import './App.css'
import Sidebar from './components/HomeLayout/Sidebar.jsx'
import Menu from './components/HomeLayout/Menu.jsx'
import Projects from './components/HomeLayout/Projects.jsx'
import InitialStuff from './components/InitialStuff.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar />
      <Menu />
      <Projects />
    </>
  )
}

export default App
