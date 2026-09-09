import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import MainPage from './pages/MainPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename="/gamegrid">
      <MainPage />
    </HashRouter>
  </StrictMode>,
)
