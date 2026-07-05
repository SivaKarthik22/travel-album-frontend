// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import TravelAlbumStore from './store/TravelAlbumStore.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={TravelAlbumStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
