import { useState } from 'react'
import Login from './Login.jsx'
import Managers from './Managers.jsx'
import Expenses from './Expenses.jsx'
import Models from './Models.jsx'
import Jobs from './Jobs.jsx'

import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/managers" element={<Managers />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/models" element={<Models />} />
    </Routes>
  )
}

export default App
