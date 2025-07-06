import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EscalatePage from './pages/EscalatePage';
import CancelPage from './pages/CancelPage';
import ReturnPage from './pages/ReturnPage';


const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/escalate/:orderId" element={<EscalatePage />} />
          <Route path="/cancel/:orderId" element={<CancelPage/>}/>
          <Route path="/return/:orderId" element={<ReturnPage/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
