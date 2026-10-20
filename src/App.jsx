import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ClutterWorkspace } from './components/ClutterWorkspace';
import { OpenInnovationInspector } from './components/OpenInnovationInspector';
import { DevPostGenerator } from './components/DevPostGenerator';
import { checkOllamaStatus } from './services/ollamaService';

export default function App() {
  const [activeTab, setActiveTab] = useState('workspace'); // 'workspace' | 'open-ai' | 'dev-post'
  const [modelStatus, setModelStatus] = useState({
    connected: false,
    models: ['qwen3:8b'],
    activeModel: 'qwen3:8b',
    error: null,
  });

  const refreshStatus = async () => {
    const status = await checkOllamaStatus();
    setModelStatus(status);
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Sticky Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        modelStatus={modelStatus} 
        onRefreshModel={refreshStatus} 
      />

      {/* Main Container */}
      <main style={{ flex: 1, padding: '0 20px', maxWidth: '1320px', width: '100%', margin: '0 auto' }}>
        
        {/* Hero banner shown on workspace and open-ai tabs */}
        {activeTab !== 'dev-post' && (
          <HeroBanner />
        )}

        {/* Tab 1: Clutter Tamer Workspace */}
        {activeTab === 'workspace' && (
          <ClutterWorkspace modelStatus={modelStatus} />
        )}

        {/* Tab 2: Why Open AI Matters Inspector */}
        {activeTab === 'open-ai' && (
          <OpenInnovationInspector modelStatus={modelStatus} />
        )}

        {/* Tab 3: DEV Challenge Post Generator */}
        {activeTab === 'dev-post' && (
          <div style={{ marginTop: '30px' }}>
            <DevPostGenerator modelStatus={modelStatus} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(52, 211, 153, 0.15)',
        background: 'rgba(7, 11, 9, 0.95)',
        padding: '30px 24px',
        marginTop: 'auto',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/sloth-avatar.jpg" 
              alt="Sloth avatar" 
              style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #10b981' }} 
            />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
              SlothTidier
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              • Built for DEV "Slow and Steady" Challenge (International Sloth Day)
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Powered by open-weight <strong>Qwen3 8B</strong> • 100% On-Device Privacy • $0.00 Running Cost
          </div>
        </div>
      </footer>
    </div>
  );
}
