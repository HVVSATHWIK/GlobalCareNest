import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
=======
import App from './App.tsx';
>>>>>>> 6571257e407549ebbfc7d359a6c37fe2b741ae70
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <AuthProvider>
        <App />
      </AuthProvider>
=======
      <App />
>>>>>>> 6571257e407549ebbfc7d359a6c37fe2b741ae70
    </BrowserRouter>
  </StrictMode>
);