import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/result'
import AuthPage from './pages/Login'
import Output from './pages/Output'
import History from './pages/History'


const App = () => {
  return (
  <div>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/get-started" element={<Result/>} />
      <Route path="/login" element={<AuthPage/>} />
      <Route path="/output" element={<Output/>} />
      <Route path="/history" element={<History/>} />
    </Routes>
  </div>      
  )
}

export default App
