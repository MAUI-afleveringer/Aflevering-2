import { useState } from 'react'
import Login from './Login.jsx'
import Managers from './Managers.jsx'
import Expenses from './Expenses.jsx'
import Models from './Models.jsx'
import Jobs from './Jobs.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import NavigationBar from './NavigationBar.jsx'

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Login />} />


        <Route path="/jobs" element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        } />
        <Route path="/managers" element={
          <ProtectedRoute>
            <Managers />
          </ProtectedRoute>
        } />
        <Route path="/expenses" element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        } />
        <Route path="/models" element={
          <ProtectedRoute>
            <Models />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App
