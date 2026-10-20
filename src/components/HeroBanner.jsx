import React from 'react';
import { SparklesIcon, ShieldCheckIcon, CpuIcon, SlothIcon } from './Icons';

export function HeroBanner({ onSelectPreset, selectedPresetId }) {
  return (
    <div className="glass-panel" style={{
      margin: '24px auto',
      maxWidth: '1280px',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid rgba(52, 211, 153, 0.25)',
    }}>
      {/* Background Hero Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'center',
        padding: '36px',
        background: 'linear-gradient(135deg, rgba(16, 28, 22, 0.95) 0%, rgba(9, 14, 11, 0.92) 100%)',
      }}>
        {/* Left copy */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge badge-amber">
              🦥 International Sloth Day Edition
            </span>
            <span className="badge badge-emerald">
              Open-Weight AI at Core
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
            color: '#ffffff',
          }}>
            Slow and Steady.<br />
            <span style={{
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Reward Your Laziness.
            </span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '24px',
            maxWidth: '560px',
          }}>
            Sloths have it figured out: move at your own pace, conserve energy, and let autonomous local AI tidy up the chaotic clutter you've been putting off for months. 
            Powered by open-weight <strong>Qwen3 8B</strong> running 100% locally on your machine.
          </p>

          {/* Value Props Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginBottom: '20px',
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(52, 211, 153, 0.15)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
            }}>
              <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheckIcon size={14} /> ZERO LEAKAGE
              </div>
              <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '2px' }}>
                Files never leave your PC
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(245, 158, 11, 0.15)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
            }}>
              <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SparklesIcon size={14} /> $0.00 EXPENSE
              </div>
              <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '2px' }}>
                Free local inference
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(6, 182, 212, 0.15)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
            }}>
              <div style={{ fontSize: '0.78rem', color: '#67e8f9', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CpuIcon size={14} /> 100% OFFLINE
              </div>
              <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '2px' }}>
                Works with zero WiFi
              </div>
            </div>
          </div>
        </div>

        {/* Right Mascot Artwork */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.7), 0 0 30px rgba(16, 185, 129, 0.2)',
            border: '2px solid rgba(52, 211, 153, 0.3)',
            maxHeight: '340px',
          }}>
            <img 
              src="/sloth-hero.jpg" 
              alt="Sloan the Sloth organizing files in a hammock" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(9, 14, 11, 0.95), transparent)',
              padding: '16px 20px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                  Meet Sloan, Your Autonomous Sloth
                </span>
                <p style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>
                  "I move slowly so you don't have to move at all."
                </p>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                Active & Lounging
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
