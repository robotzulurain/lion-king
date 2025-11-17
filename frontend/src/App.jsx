import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import { authService } from './services/authService';
import Overview from "./components/Overview.jsx";
import Trends from "./components/Trends.jsx";
import Antibiogram from "./components/Antibiogram.jsx";
import SexAge from "./components/SexAge.jsx";
import GeoTab from "./components/Geo.jsx";
import Reports from "./components/Reports.jsx";
import Alerts from "./components/Alerts.jsx";
import DataEntry from "./components/DataEntry.jsx";
import FilterBar from "./components/FilterBar.jsx";
import { FiltersProvider } from "./filters.jsx";

const TABS = ["Overview","Trends","Antibiogram","Sex & Age","Geo","Data Entry","Alerts","Reports"];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Overview");

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      setIsAuthenticated(loggedIn);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Your existing dashboard - NO CHANGES to the original functionality
  return (
    <FiltersProvider>
      <div className="app">
        {/* Add logout button to your header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1>AMR Surveillance Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        <div className="tabs">
          {TABS.map(t => (
            <button key={t} className={`tab ${tab===t ? "active":""}`} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </div>

        {/* Global filter bar */}
        <FilterBar />

        <div className="panel">
          {tab==="Overview" && <Overview/>}
          {tab==="Trends" && <Trends/>}
          {tab==="Antibiogram" && <Antibiogram/>}
          {tab==="Sex & Age" && <SexAge/>}
          {tab==="Geo" && <GeoTab/>}
          {tab==="Data Entry" && <DataEntry/>}
          {tab==="Alerts" && <Alerts/>}
          {tab==="Reports" && <Reports/>}
        </div>

        <style>{`
          .app { font-family: system-ui, sans-serif; padding: 16px; }
          .tabs { display:flex; gap:8px; flex-wrap: wrap; margin: 8px 0 16px; }
          .tab { padding:8px 12px; border-radius:10px; border:1px solid #ddd; background:#f9fafb; cursor:pointer; }
          .tab.active { background:#e6f2ff; border-color:#93c5fd; }
          .panel { background:white; border:1px solid #eee; border-radius:12px; padding:12px; }
        `}</style>
      </div>
    </FiltersProvider>
  );
}

export default App;
