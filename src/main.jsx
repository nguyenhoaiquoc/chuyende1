import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Footer from "./components/Footer.jsx";
import Collection from './collection.jsx'
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 👈 Bọc toàn bộ ứng dụng */}
      <App />
      <Collection />
      <Footer />
    </BrowserRouter>
  </StrictMode>,
);
