import React from 'react';
import { SlothIcon, CpuIcon, ShieldCheckIcon, SparklesIcon } from './Icons';

export function Navbar({ activeTab, setActiveTab, modelStatus, onRefreshModel }) {
  return (
    <header style={{
      borderBottom: '1px solid rgba(52, 211, 153, 0.15)',
      background: 'rgba(10, 15, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src="/sloth-avatar.jpg" 
            alt="Sloth Sloan" 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '2px solid #10b981',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
              objectFit: 'cover'
            }} 
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fff' }}>
                SlothTidier
              </span>
              <span className="badge badge-emerald">
                Slow & Steady
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Open-Weight AI Clutter Agent • International Sloth Day Edition
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('workspace')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid',
              borderColor: activeTab === 'workspace' ? 'var(--emerald-primary)' : 'transparent',
              background: activeTab === 'workspace' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: activeTab === 'workspace' ? '#34d399' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            🦥 Clutter Tamer
          </button>

          <button
            onClick={() => setActiveTab('open-ai')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid',
              borderColor: activeTab === 'open-ai' ? 'var(--emerald-primary)' : 'transparent',
              background: activeTab === 'open-ai' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: activeTab === 'open-ai' ? '#34d399' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            🛡️ Why Open AI Matters
          </button>

          <button
            onClick={() => setActiveTab('dev-post')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid',
              borderColor: activeTab === 'dev-post' ? 'var(--amber-primary)' : 'transparent',
              background: activeTab === 'dev-post' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: activeTab === 'dev-post' ? '#fbbf24' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            📝 DEV Post Generator
          </button>
        </nav>

        {/* Local Model Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(18, 28, 23, 0.9)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(52, 211, 153, 0.25)',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: modelStatus.connected ? '#10b981' : '#f59e0b',
            boxShadow: modelStatus.connected ? '0 0 8px #10b981' : '0 0 8px #f59e0b',
            display: 'inline-block',
          }} />
          <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Model:</span>
            <span style={{ fontWeight: 600, color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
              {modelStatus.activeModel || 'qwen3:8b'}
            </span>
          </div>
          <span style={{
            fontSize: '0.72rem',
            padding: '2px 8px',
            borderRadius: '10px',
            background: modelStatus.connected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
            color: modelStatus.connected ? '#34d399' : '#fbbf24',
            fontWeight: 700,
          }}>
            {modelStatus.connected ? '100% LOCAL' : 'OFFLINE HEURISTIC'}
          </span>
        </div>
      </div>
    </header>
  );
}
