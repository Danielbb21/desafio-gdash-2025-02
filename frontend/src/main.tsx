import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './providers/authProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer position='bottom-right' theme='colored' autoClose={1500} />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
