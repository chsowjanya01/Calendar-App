import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CompanyForm from './components/Admin/CompanyForm';
import CommunicationMethods from './components/Admin/CommunicationMethods';
import Dashboard from './components/User/Dashboard';
import CalendarView from './components/User/CalendarView';
import CommunicationFrequencyReport from './components/Reporting/CommunicationFrequencyReport'; // New Module
import './App.css'; // Link to external CSS for better styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1 className="app-title">Calendar App</h1>
        </header>

        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/admin" className="nav-link">Admin Module</Link>
          <Link to="/user" className="nav-link">User Module</Link>
          <Link to="/calendar" className="nav-link">Calendar View</Link>
          <Link to="/reporting" className="nav-link">Reporting & Analytics</Link>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<p className="home-message">Welcome to the Calendar App. Manage your communications efficiently.</p>} />
            <Route
              path="/admin"
              element={
                <div className="admin-section">
                  <h2 className="section-title">Admin Module</h2>
                  <div className="admin-content">
                    <div>
                      <h3 className="subsection-title">Company Management</h3>
                      <CompanyForm />
                    </div>
                    <div>
                      <h3 className="subsection-title">Communication Method Management</h3>
                      <CommunicationMethods />
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/user" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/reporting" element={<CommunicationFrequencyReport />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
