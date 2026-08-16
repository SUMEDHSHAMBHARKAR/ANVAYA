import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export const Button = ({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) => (
  <button className={`btn btn-${variant} ${className}`} {...props}>
    {children}
  </button>
);

export const Input = ({ label, className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
  <div className={className}>
    {label && <label className="input-label">{label}</label>}
    <input className="input-base" {...props} />
  </div>
);

export const Select = ({ label, children, className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) => (
  <div className={className}>
    {label && <label className="input-label">{label}</label>}
    <select className="input-base" {...props}>
      {children}
    </select>
  </div>
);

export const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`badge ${className}`}>
    {children}
  </span>
);

export const RiskBadge = ({ level, className = '' }: { level: 'low' | 'moderate' | 'high' | 'critical'; className?: string }) => {
  const labels = {
    low: 'Low Risk',
    moderate: 'Moderate Risk',
    high: 'High Risk',
    critical: 'Critical Risk',
  };
  return (
    <Badge className={`risk-${level} ${className}`}>
      {labels[level]}
    </Badge>
  );
};

export const Card = ({ children, className = '', title, subtitle, style }: { children: React.ReactNode; className?: string; title?: React.ReactNode; subtitle?: React.ReactNode; style?: React.CSSProperties }) => (
  <div className={`card ${className}`} style={style}>
    {(title || subtitle) && (
      <div className="card-header">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
    )}
    <div className="card-content">
      {children}
    </div>
  </div>
);

export const Metric = ({ label, value, className = '' }: { label: string; value: React.ReactNode; className?: string }) => (
  <div className={`metric ${className}`}>
    <div className="metric-label">{label}</div>
    <div className="metric-value">{value}</div>
  </div>
);

export const SectionHeader = ({ title, subtitle, className = '', action }: { title: string; subtitle?: string; className?: string, action?: React.ReactNode }) => (
  <div className={`section-header ${className}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const MapContainer = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`map-container ${className}`}>
    <div className="map-placeholder-grid"></div>
    {children || <div style={{ position: 'relative', color: 'var(--primary)', fontWeight: 500 }}>Geospatial Viewport</div>}
  </div>
);

export const LoadingState = ({ message = 'Loading data...', className = '' }: { message?: string; className?: string }) => (
  <div className={`state-container ${className}`}>
    <Loader2 className="state-icon animate-spin" size={32} style={{ animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    <p>{message}</p>
  </div>
);

export const EmptyState = ({ message = 'No data available', description, className = '' }: { message?: string; description?: string; className?: string }) => (
  <div className={`state-container ${className}`}>
    <AlertCircle className="state-icon" size={32} />
    <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '4px' }}>{message}</h3>
    {description && <p style={{ fontSize: '13px' }}>{description}</p>}
  </div>
);
