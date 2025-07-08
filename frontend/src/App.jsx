import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EscalatePage from './pages/EscalatePage';
import CancelPage from './pages/CancelPage';
import ReturnPage from './pages/ReturnPage';
import ReturnSummaryPage from "./pages/ReturnSummaryPage";
import EscalationSummaryPage from "./pages/EscalationSummaryPage";
import CancelSummaryPage from './pages/CancelSummaryPage';


const App = () => {
  return (
    <Router>
      <div className="container mt-4" style={{backgroundColor: "blue", color: "white"}} >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/escalate/:orderId" element={<EscalatePage />} />
          <Route path="/cancel/:orderId" element={<CancelPage/>}/>
          <Route path="/return/:orderId" element={<ReturnPage/>} />
          <Route path="/return-summary/:orderId" element={<ReturnSummaryPage />} />
          <Route path="/escalation-summary/:orderId" element={<EscalationSummaryPage />} />
          <Route path="/cancel-summary/:orderId" element={<CancelSummaryPage/>} />
          
        </Routes>
      </div>
    </Router>
  )
}

export default App
