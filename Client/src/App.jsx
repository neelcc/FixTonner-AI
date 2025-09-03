import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/result'
import Navbar from './components/Navbar'
import AuthPage from './pages/Login'
import Output from './pages/Output'


const App = () => {
  return (
  <div>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/get-started" element={<Result/>} />
      <Route path="/login" element={<AuthPage/>} />
      <Route path="/output" element={<Output/>} />
    </Routes>
  </div>      
  )
}

export default App
