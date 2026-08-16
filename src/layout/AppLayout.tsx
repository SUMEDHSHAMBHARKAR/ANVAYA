import { NavLink, Outlet } from 'react-router-dom';
import { MapPin, Beaker, LayoutDashboard, Activity, Droplets, GitMerge } from 'lucide-react';

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-title">ANVAYA</div>
          <div className="brand-subtitle">Urban Infrastructure & Climate Resilience Intelligence System</div>
        </div>

        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LayoutDashboard size={16} />
              Overview
            </span>
          </NavLink>
          <NavLink to="/infrastructure" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={16} />
              Infrastructure Planner
            </span>
          </NavLink>
          <NavLink to="/flood" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Droplets size={16} />
              Flood Predictor
            </span>
          </NavLink>
          <NavLink to="/decision" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GitMerge size={16} />
              Decision Engine
            </span>
          </NavLink>
        </nav>

        <div className="header-context">
          <div className="context-item">
            <MapPin size={14} />
            Nagpur
          </div>
          <div className="context-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Beaker size={12} />
            Prototype Environment
          </div>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};
