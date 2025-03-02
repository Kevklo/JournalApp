import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { JournalApp } from './JournalApp'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'
import './styles.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
