import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LeaderboardProvider } from './context/LeaderboardContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeaderboardProvider>
      <App />
    </LeaderboardProvider>
  </StrictMode>,
)
