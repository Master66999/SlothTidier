import React from 'react';
import { ShieldCheckIcon, SparklesIcon, CpuIcon, CheckCircleIcon, ArrowRightIcon } from './Icons';

export function OpenInnovationInspector({ modelStatus }) {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
          Open-Weight Architecture Deep-Dive
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          Why Open Innovation Matters for SlothTidier
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '10px auto 0' }}>
          In the DEV "Slow and Steady" challenge, open-source AI isn't just an implementation detail—it is the foundational reason this application can exist safely.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {/* Pillar 1: Zero Data Leakage */}
        <div className="glass-panel" style={{ padding: '28px', borderTop: '3px solid #10b981' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#34d399',
            marginBottom: '18px',
          }}>
            <ShieldCheckIcon size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
            1. Zero Cloud Data Leakage
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
            A user's messy Downloads folder contains medical bills, W-2 tax forms, private keys, client contracts, and personal screenshots. Sending these to proprietary third-party cloud APIs represents an unacceptable privacy hazard.
          </p>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: '#a7f3d0',
            fontFamily: 'var(--font-mono)',
          }}>
            🔒 Bound strictly to 127.0.0.1:11434. 0 outbound network requests.
          </div>
        </div>

        {/* Pillar 2: Cost-Free Laziness */}
        <div className="glass-panel" style={{ padding: '28px', borderTop: '3px solid #f59e0b' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
            marginBottom: '18px',
          }}>
            <SparklesIcon size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
            2. $0.00 Infinite Inference
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
            If organizing 200 files costs $0.03 per API call, users will hesitate or fear surprise token bills. With open-weight models (Qwen3 8B, Llama 3), you set it up once and it costs literally $0.00 forever.
          </p>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: '#fde68a',
            fontFamily: 'var(--font-mono)',
          }}>
            💰 Flat $0.00 monthly subscription. True carefree sloth laziness.
          </div>
        </div>

        {/* Pillar 3: Offline Resilience */}
        <div className="glass-panel" style={{ padding: '28px', borderTop: '3px solid #06b6d4' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(6, 182, 212, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#67e8f9',
            marginBottom: '18px',
          }}>
            <CpuIcon size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
            3. Airplane-Mode & Off-Grid
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
            Tidying a laptop usually happens on long flights, train commutes, or remote cabins where WiFi is nonexistent or flaky. Closed APIs fail immediately without internet; SlothTidier runs undisturbed.
          </p>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: '#a5f3fc',
            fontFamily: 'var(--font-mono)',
          }}>
            ✈️ Tested and proven on airplane mode with zero degraded features.
          </div>
        </div>

        {/* Pillar 4: Model Sovereignty & Swappability */}
        <div className="glass-panel" style={{ padding: '28px', borderTop: '3px solid #a855f7' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(168, 85, 247, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c084fc',
            marginBottom: '18px',
          }}>
            <CheckCircleIcon size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
            4. Swappability & Sovereignty
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
            You are never locked into a single provider's policy changes or price hikes. Swap seamlessly between Qwen3 8B, Llama 3.2, Mistral NeMo, or fine-tune your own personal organizational model.
          </p>
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: '#e9d5ff',
            fontFamily: 'var(--font-mono)',
          }}>
            🔄 Open weights mean complete user control over weights and prompts.
          </div>
        </div>
      </div>

      {/* Comparison Matrix: Open-Weight vs Closed Cloud API */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '18px' }}>
          Direct Architecture Comparison: Open-Source vs Proprietary
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(52, 211, 153, 0.2)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '14px 16px' }}>Criterion</th>
                <th style={{ padding: '14px 16px', color: '#34d399' }}>SlothTidier (Open-Weight Qwen3)</th>
                <th style={{ padding: '14px 16px', color: '#f87171' }}>Closed Commercial API (OpenAI/Claude Cloud)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#fff' }}>Data Privacy</td>
                <td style={{ padding: '14px 16px', color: '#34d399' }}>✅ 100% On-device, 0 bytes transmitted</td>
                <td style={{ padding: '14px 16px', color: '#f87171' }}>❌ File metadata sent to external servers</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#fff' }}>Running Cost</td>
                <td style={{ padding: '14px 16px', color: '#34d399' }}>✅ $0.00 / free forever</td>
                <td style={{ padding: '14px 16px', color: '#f87171' }}>❌ Metered per-token API billing</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#fff' }}>Offline Operation</td>
                <td style={{ padding: '14px 16px', color: '#34d399' }}>✅ Works on flights, trains, off-grid</td>
                <td style={{ padding: '14px 16px', color: '#f87171' }}>❌ Hard requirement for stable internet</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#fff' }}>Reasoning Transparency</td>
                <td style={{ padding: '14px 16px', color: '#34d399' }}>✅ Full access to internal <code>&lt;think&gt;</code> tokens</td>
                <td style={{ padding: '14px 16px', color: '#f87171' }}>❌ Black-box obscured reasoning output</td>
              </tr>
              <tr>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#fff' }}>Longevity / Deprecation</td>
                <td style={{ padding: '14px 16px', color: '#34d399' }}>✅ GGUF weights run 10 years from today</td>
                <td style={{ padding: '14px 16px', color: '#f87171' }}>❌ Endpoints deprecated at provider whim</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
