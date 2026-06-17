import { lazy, Suspense } from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import ContainerLoadingUI from './components/utilityComponents/ContainerLoadingUI';

const LoginPage = lazy(()=> import('./components/login/LoginPage'));

function App() {
  return (
    <Suspense fallback={<ContainerLoadingUI width="full" height="screen"/>}>
      <Routes>
        <Route path='/login' element={<LoginPage loginMode={true} />}></Route>
        <Route path='/signup' element={<LoginPage loginMode={false}/>}></Route>
      </Routes>
    </Suspense>
  )
}

export default App