import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/gamegrid">
      <MainPage />
    </BrowserRouter>
  </StrictMode>,
)