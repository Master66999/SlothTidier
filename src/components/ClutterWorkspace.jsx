import React, { useState, useRef } from 'react';
import { 
  FolderIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  DownloadIcon, 
  TerminalIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  FileTextIcon, 
  CopyIcon, 
  ArrowRightIcon,
  SlothIcon
} from './Icons';
import { CLUTTER_PRESETS } from '../data/clutterPresets';
import { organizeClutterWithOllama } from '../services/ollamaService';
import { generatePowerShellScript, generateBashScript, downloadTextFile } from '../utils/exporter';

export function ClutterWorkspace({ modelStatus }) {
  const [selectedPreset, setSelectedPreset] = useState(CLUTTER_PRESETS[0]);
  const [currentFiles, setCurrentFiles] = useState(CLUTTER_PRESETS[0].files);
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [organizationResults, setOrganizationResults] = useState(null);
  const [activeSpeedMode, setActiveSpeedMode] = useState('deep'); // 'deep' | 'brisk'
  const [thinkingOutput, setThinkingOutput] = useState('');
  const [customFileName, setCustomFileName] = useState('');
  const [copiedScriptType, setCopiedScriptType] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const fileInputRef = useRef(null);

  // Switch preset
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setCurrentFiles(preset.files);
    setOrganizationResults(null);
    setThinkingOutput('');
  };

  // Add custom file to list
  const handleAddCustomFile = (e) => {
    e.preventDefault();
    if (!customFileName.trim()) return;
    const newFile = {
      name: customFileName.trim(),
      size: '1.2 MB',
      type: 'application/octet-stream',
      preview: 'User added custom file'
    };
    setCurrentFiles(prev => [newFile, ...prev]);
    setCustomFileName('');
  };

  // Handle native file drop or upload
  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files || []);
    if (!uploaded.length) return;

    const newFiles = uploaded.map(f => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      type: f.type || 'application/octet-stream',
      preview: `Local disk file: ${f.name}`,
    }));

    setCurrentFiles(prev => [...newFiles, ...prev]);
  };

  // Remove individual file
  const handleRemoveFile = (indexToRemove) => {
    setCurrentFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Run the autonomous open-weight sloth tamer
  const handleRunTidier = async () => {
    if (!currentFiles.length) return;
    setIsOrganizing(true);
    setThinkingOutput('🦥 Sloan is stretching lazily and waking up the local Qwen3 8B model...');

    const result = await organizeClutterWithOllama(
      currentFiles,
      modelStatus.activeModel || 'qwen3:8b',
      activeSpeedMode === 'deep'
    );

    setIsOrganizing(false);
    if (result && result.success) {
      setOrganizationResults(result);
      if (result.rawThinking) {
        setThinkingOutput(result.rawThinking);
      }
    }
  };

  // Copy script to clipboard
  const handleCopyScript = (type, script) => {
    navigator.clipboard.writeText(script);
    setCopiedScriptType(type);
    setTimeout(() => setCopiedScriptType(null), 2500);
  };

  const toggleTask = (idx) => {
    setCompletedTasks(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Preset Selector Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0' }}>
            1. Select a Clutter Nightmare or Drag Your Own
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {currentFiles.length} files currently in queue
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {CLUTTER_PRESETS.map((preset) => {
            const isSelected = selectedPreset?.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                style={{
                  background: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(18, 28, 23, 0.6)',
                  border: `1px solid ${isSelected ? 'var(--emerald-primary)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 0 15px rgba(16, 185, 129, 0.2)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: isSelected ? '#34d399' : '#fff', fontSize: '0.98rem' }}>
                    {preset.title}
                  </span>
                  <span className={`badge ${isSelected ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.7rem' }}>
                    {preset.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {preset.subtitle}
                </p>
                <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#6ee7b7' }}>
                  {preset.files.length} sample chaotic files
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Grid: Clutter Queue + Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {/* Left: Clutter Queue & Ingestion */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FolderIcon className="pulsing-emerald" size={20} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                The Messy Inbox (Unorganized Pile)
              </h3>
            </div>
            <button
              onClick={() => setCurrentFiles([])}
              className="btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#f87171' }}
              title="Clear all"
            >
              Clear Pile
            </button>
          </div>

          {/* Quick Add Custom Filename */}
          <form onSubmit={handleAddCustomFile} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              value={customFileName}
              onChange={(e) => setCustomFileName(e.target.value)}
              placeholder="Add your messy filename (e.g. receipt_uber_final.pdf)..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: '#090e0b',
                border: '1px solid rgba(52, 211, 153, 0.2)',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-secondary" style={{ padding: '10px 16px' }}>
              + Add
            </button>
          </form>

          {/* Hidden File Input & Drag Box */}
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed rgba(52, 211, 153, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(16, 185, 129, 0.03)',
              marginBottom: '16px',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ color: '#34d399', marginBottom: '6px' }}>
              <FileTextIcon size={24} />
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#e2e8f0' }}>
              Click or Drop Real Files Here
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Images, PDFs, code, screenshots, invoices (All analyzed locally)
            </div>
          </div>

          {/* Files List Scrollbox */}
          <div style={{
            maxHeight: '320px',
            overflowY: 'auto',
            paddingRight: '6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {currentFiles.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No files in the pile. Pick a preset above or drop messy files!
              </div>
            ) : (
              currentFiles.map((f, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <FileTextIcon size={14} className="text-muted" />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      color: '#cbd5e1',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {f.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                      {f.size}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Autonomous Controls & Live Thinking Monologue */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
              2. Sloan's Automation Cockpit
            </h3>
            <span className="badge badge-emerald">
              Open-Weight Qwen3 8B
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Sit back, put your feet up, and don't lift a finger. Sloan will read the file signatures, detect duplicate junk, organize everything into smart folders, and extract hidden to-dos.
          </p>

          {/* Sloth Thinking Mode Options */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            border: '1px solid rgba(52, 211, 153, 0.15)',
            marginBottom: '20px',
          }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a7f3d0', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Sloth Inference Cadence
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setActiveSpeedMode('deep')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${activeSpeedMode === 'deep' ? 'var(--emerald-primary)' : 'rgba(255,255,255,0.1)'}`,
                  background: activeSpeedMode === 'deep' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  color: activeSpeedMode === 'deep' ? '#34d399' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>🦥 True Sloth</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: '2px' }}>
                  Deep Qwen3 reasoning & thinking chain
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSpeedMode('brisk')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${activeSpeedMode === 'brisk' ? 'var(--amber-primary)' : 'rgba(255,255,255,0.1)'}`,
                  background: activeSpeedMode === 'brisk' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                  color: activeSpeedMode === 'brisk' ? '#fbbf24' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>⚡ Brisk Sloth</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: '2px' }}>
                  Instant zero-delay schema extraction
                </div>
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleRunTidier}
            disabled={isOrganizing || currentFiles.length === 0}
            className="btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginBottom: '20px' }}
          >
            {isOrganizing ? (
              <>
                <span className="pulsing-emerald">🦥</span> Sloan is Tidying Lazily...
              </>
            ) : (
              <>
                <SparklesIcon size={18} /> Tidy My Mess (Slow & Steady)
              </>
            )}
          </button>

          {/* Live Sloth Internal Monologue */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Sloan's Internal Monologue:
              </span>
              {organizationResults?.modelUsed && (
                <span style={{ fontSize: '0.72rem', color: '#6ee7b7', fontFamily: 'var(--font-mono)' }}>
                  {organizationResults.modelUsed} ({organizationResults.totalDurationMs}ms)
                </span>
              )}
            </div>

            <div className="code-box" style={{ flex: 1, minHeight: '130px', maxHeight: '180px' }}>
              {thinkingOutput || (
                <span style={{ color: 'var(--text-dim)' }}>
                  Awaiting instruction. Sloan is currently napping in his treehouse hammock...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section: The Organized Sloth System */}
      {organizationResults && (
        <div style={{ animation: 'slothNap 0.4s ease-out' }}>
          
          {/* Sloan's Morning Briefing Card */}
          <div className="glass-panel" style={{
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(135deg, rgba(16, 28, 22, 0.9) 0%, rgba(13, 20, 16, 0.9) 100%)',
          }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <img 
                src="/sloth-avatar.jpg" 
                alt="Sloan" 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '2px solid #34d399',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                    Sloan's Sloth Morning Briefing
                  </h3>
                  <span className="badge badge-emerald">
                    Organized Automatically
                  </span>
                </div>
                <p style={{
                  fontSize: '1.05rem',
                  color: '#e2e8f0',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '12px',
                }}>
                  "{organizationResults.data.slothBriefing}"
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                  <div style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheckIcon size={14} /> Zero data left 127.0.0.1
                  </div>
                  <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SparklesIcon size={14} /> {organizationResults.data.spaceSavedEstimate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items / Hidden To-Dos extracted from the clutter */}
          {organizationResults.data.extractedActions?.length > 0 && (
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>⚡</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    Hidden Deadlines & Action Items Sloan Discovered
                  </h3>
                </div>
                <span className="badge badge-amber">
                  No effort needed
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {organizationResults.data.extractedActions.map((act, i) => (
                  <div
                    key={i}
                    onClick={() => toggleTask(i)}
                    style={{
                      background: completedTasks[i] ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${completedTasks[i] ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!completedTasks[i]}
                      onChange={() => {}}
                      style={{ marginTop: '4px', cursor: 'pointer', accentColor: '#10b981' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: completedTasks[i] ? '#94a3b8' : '#f1f5f3',
                        textDecoration: completedTasks[i] ? 'line-through' : 'none',
                      }}>
                        {act.task}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <span>Source: <code style={{ color: '#a7f3d0' }}>{act.sourceFile}</code></span>
                        <span className={`badge ${act.priority === 'high' ? 'badge-amber' : 'badge-emerald'}`} style={{ fontSize: '0.65rem' }}>
                          {act.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Folder Hierarchy & Clean Renamed Files Table */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                  3. Clean File Taxonomy & Renaming Map
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  All files normalized, duplicates flagged, and sorted into logical folders
                </p>
              </div>

              {/* Action Buttons to execute reorganization */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const script = generatePowerShellScript(organizationResults.data.organizedFiles);
                    downloadTextFile('tidy-my-clutter.ps1', script);
                  }}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                >
                  <TerminalIcon size={14} /> Download PowerShell Script (.ps1)
                </button>

                <button
                  onClick={() => {
                    const script = generateBashScript(organizationResults.data.organizedFiles);
                    downloadTextFile('tidy-my-clutter.sh', script);
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                >
                  <TerminalIcon size={14} /> Download Bash Script (.sh)
                </button>

                <button
                  onClick={() => {
                    const json = JSON.stringify(organizationResults.data, null, 2);
                    downloadTextFile('sloth-tidy-manifest.json', json);
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                >
                  <DownloadIcon size={14} /> Export Manifest
                </button>
              </div>
            </div>

            {/* Folder Badges Row */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {organizationResults.data.folders?.map((folder, i) => {
                const count = organizationResults.data.organizedFiles.filter(f => f.folder === folder.name).length;
                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(52, 211, 153, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <FolderIcon size={16} className="text-emerald" />
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#fff' }}>
                        {folder.name}
                      </span>
                      <span style={{ marginLeft: '6px', fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>
                        ({count} files)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table of Files */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{
                    borderBottom: '1px solid rgba(52, 211, 153, 0.2)',
                    textAlign: 'left',
                    color: 'var(--text-muted)',
                  }}>
                    <th style={{ padding: '12px 14px' }}>Original Messy File</th>
                    <th style={{ padding: '12px 14px' }}></th>
                    <th style={{ padding: '12px 14px' }}>Smart Renamed File</th>
                    <th style={{ padding: '12px 14px' }}>Assigned Folder</th>
                    <th style={{ padding: '12px 14px' }}>Status / Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {organizationResults.data.organizedFiles.map((file, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        background: file.isDuplicateOrJunk ? 'rgba(244, 63, 94, 0.05)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                        <span style={{ textDecoration: file.isDuplicateOrJunk ? 'line-through' : 'none' }}>
                          {file.originalName}
                        </span>
                      </td>

                      <td style={{ padding: '12px 4px', color: '#34d399' }}>
                        <ArrowRightIcon size={14} />
                      </td>

                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#34d399' }}>
                        {file.newName}
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.05)',
                          fontSize: '0.78rem',
                          color: '#e2e8f0',
                        }}>
                          <FolderIcon size={12} /> {file.folder}
                        </span>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        {file.isDuplicateOrJunk ? (
                          <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                            Duplicate / Junk
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {file.reason}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Copy Script Drawer */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(9, 14, 11, 0.9)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TerminalIcon size={18} className="text-emerald" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                  Execute on Your Real Machine (PowerShell Snippet)
                </span>
              </div>
              <button
                onClick={() => handleCopyScript('ps1', generatePowerShellScript(organizationResults.data.organizedFiles))}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <CopyIcon size={14} /> {copiedScriptType === 'ps1' ? 'Copied to Clipboard!' : 'Copy PowerShell Code'}
              </button>
            </div>
            <pre style={{
              background: '#040705',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              color: '#34d399',
              maxHeight: '140px',
              overflowY: 'auto',
            }}>
              {generatePowerShellScript(organizationResults.data.organizedFiles)}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
}
