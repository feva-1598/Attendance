import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import Navigation from './components/nav'
import Classes from './components/classes'
import Student from './components/students'
import './index.css'
import DataBase from './components/database'
import Settings from './components/settings'
import QrScanner from './components/takeattendance'

import './demos/ipc'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme>
        <BrowserRouter>
         <Navigation>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path='/classes' element={<Classes />}/>
              <Route path='/student' element={<Student />}/>
              <Route path='/database' element={<DataBase />}/>
              <Route path='/settings' element={<Settings />}/>
              <Route path='/take' element={<QrScanner />}/>
          </Routes>
          </Navigation>
        </BrowserRouter>
    </Theme>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
