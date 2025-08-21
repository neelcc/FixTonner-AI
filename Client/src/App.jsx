import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/result'
import Navbar from './components/Navbar'
import AuthPage from './pages/Login'


const App = () => {
  return (
  <div>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/get-started" element={<Result/>} />
      <Route path="/login" element={<AuthPage/>} />
    </Routes>
  </div>      
  )
}

export default App
