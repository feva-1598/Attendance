import { useState } from 'react'
import UpdateElectron from '@/components/update'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './App.css'
import Home from './components/home'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
        <Home />
    </div>
  )
}

export default App