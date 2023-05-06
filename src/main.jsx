import React from 'react'
import ReactDOM from 'react-dom/client'
import { JournalApp } from './JournalApp.jsx'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <JournalApp />
    </React.StrictMode>
  </BrowserRouter>
)
