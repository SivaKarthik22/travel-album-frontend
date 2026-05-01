import { lazy, Suspense } from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import BigLoadingUI from './components/utilityComponents/BigLoadingUI';

const LoginPage = lazy(()=> import('./components/login/LoginPage'));

function App() {
  return (
    <Suspense fallback={<BigLoadingUI/>}>
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
      </Routes>
    </Suspense>
  )
}

export default App