import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Components/Home/home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='p-2 h-screen bg-blue-50'>
      <Home />
    </div>
  </StrictMode>,
)
