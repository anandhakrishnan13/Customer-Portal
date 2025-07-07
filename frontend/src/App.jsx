import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EscalatePage from './pages/EscalatePage';
import CancelPage from './pages/CancelPage';
import ReturnPage from './pages/ReturnPage';
import ReturnSummaryPage from "./pages/ReturnSummaryPage";
import EscalationSummaryPage from "./pages/EscalationSummaryPage";


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
          <Route path="/return-summary" element={<ReturnSummaryPage />} />
          <Route path="/escalation-summary" element={<EscalationSummaryPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
