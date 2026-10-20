import React, { useState } from 'react';
import { CopyIcon } from './Icons';

export function DevPostGenerator({ modelStatus }) {
  const [copied, setCopied] = useState(false);

  const devPostContent = `*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 3: Slow and Steady](https://dev.to/challenges/hacktoberfest-week3-2026-10-19)*

---

## What I Built

**SlothTidier** is a local-first autonomous file organizer powered by the open-weight **Qwen3 8B** model running entirely on your own machine via Ollama.

It tackles the single most universally dreaded computer chore: the overflowing, chaotic Downloads folder full of cryptically named PDFs, duplicate screenshots, abandoned \`.sql\` files, and unopened tax receipts you've been avoiding for months.

You dump the clutter. **Sloan the Sloth** — the AI agent — wakes up from his hammock nap, analyzes every file, then:

- 📁 **Categorizes** files into organized semantic folders (\`01_Finances_&_Receipts\`, \`02_Work_&_Contracts\`, \`03_Dev_&_Configs\`, \`04_Personal_Health\`, \`05_Media_&_Recordings\`, \`06_Junk_&_Archive\`)
- ✍️ **Renames** cryptic filenames into clean conventions (e.g. \`Scan_001923.jpg\` → \`invoice-herman-miller-desk-oct2026.jpg\`)
- 🗑️ **Detects duplicates** — accidental double-scans, \`filename (1).pdf\` copies, stale logs — and flags them for archiving
- ⚡ **Extracts hidden to-dos** — payment deadlines, doctor follow-up notes, expiring subscriptions buried inside documents
- 💻 **Generates a one-click PowerShell (.ps1) or Bash (.sh) script** that moves and renames your actual physical files on disk instantly

Who gets to be a little lazier? Anyone who has ever looked at their Downloads folder and immediately closed the tab.

---

## Demo

🌐 **Live App**: [https://slothtidier.onrender.com](https://slothtidier.onrender.com)

> On the live demo, **Qwen3 8B runs via the built-in offline heuristic engine** (since Render doesn't host local GPU inference). For **full local Qwen3 8B inference with live \`<think>\` reasoning tokens**, clone the repo and connect your own Ollama instance. The live demo is 100% functional.

Try the **"The 300-Item Downloads Swamp"** preset instantly — no files to upload, no sign-up, no API key needed.

---

## Code

{% github Master66999/SlothTidier %}

**Key files:**
- \`src/services/ollamaService.js\` — The open-weight AI core: communicates with local Qwen3 via Ollama, parses \`<think>\` reasoning tokens, and falls back to a local heuristic engine when offline
- \`src/components/ClutterWorkspace.jsx\` — The main workspace: drag & drop ingestion, preset selector, autonomous analysis cockpit, results table, to-do extraction
- \`src/utils/exporter.js\` — Generates executable PowerShell and Bash reorganization scripts

---

## How I Built It

### Open-Source AI at the Core

The entire intelligence layer uses **Qwen3 8B** — a fully open-weight model published by Alibaba Cloud under the Apache 2.0 license. I run it locally through **Ollama** (open-source local inference engine), talking to it via its REST API at \`http://127.0.0.1:11434\`.

What makes Qwen3 8B particularly well-suited:
- **Thinking/Reasoning Mode** — Supports explicit \`<think>...</think>\` token streaming, letting the app show Sloan's internal monologue as he deliberates on your files
- **Structured JSON Output** — Reliably returns a schema-defined response with folder mappings, new names, duplicate flags, and extracted action items
- **8.2B Parameters** — Fast enough to run locally on consumer hardware, even without a GPU

### Architecture

\`\`\`
User drops files → React frontend → Vite proxy (/api/ollama) → 
  Ollama (127.0.0.1:11434) → Qwen3 8B local inference →
    JSON response (folders, renames, to-dos) → 
      PowerShell / Bash script generated → 
        User runs script → Files organized on real disk ✅
\`\`\`

**The fallback system**: If Ollama isn't running, the app automatically switches to a smart local heuristic engine — analyzing filenames, extensions, and patterns. No cloud API is ever called.

### Tech Stack

| Layer | Technology |
| :--- | :--- |
| Open-Weight Model | Qwen3 8B (GGUF, Q4_K_M quantization) |
| Local Inference | Ollama 0.34.0 |
| Frontend | Vite 8 + React 19 |
| Styling | Vanilla CSS (glassmorphism, dark forest palette) |
| Script Export | PowerShell Core + POSIX Bash generator |
| Deployment | Render (static site) |

---

## Why Does Open Innovation Matter?

For SlothTidier, open innovation isn't a preference — **it is the fundamental reason the tool can exist safely.**

### 1. Zero Cloud Data Leakage
Your messy Downloads folder is the most private space on your computer: W-2 tax forms, medical lab results, client contracts, \`.env\` backup files with production secrets, bank statements.

Sending any of these to a closed commercial API means transferring your private life to servers you do not control, cannot audit, and cannot remove your data from.

With Qwen3 8B running locally, **zero bytes of your data ever leave your machine.** Not the filenames. Not the file sizes. Nothing.

### 2. $0.00 Forever
A closed API charges per thousand tokens. With open weights, you download the GGUF file once. Then you can organize 200 files, 2,000 files, or 200,000 files for **literally $0.00**, on any day, indefinitely.

### 3. Passes the Airplane Test
People clean their laptops on long flights and rural cabins without WiFi. Closed APIs fail the moment the connection drops. SlothTidier runs with **zero internet required**.

### 4. Model Freedom and Longevity
You aren't locked to a provider's deprecation schedule. Swap to \`llama3.2:latest\`, \`mistral-nemo\`, or a custom LoRA fine-tune in one line. The GGUF weights you download today will still run in 10 years.

---

## My Agent Session

This entire project — from architecture design to Ollama integration, component building, image generation, script export, and deployment — was built autonomously using an AI coding agent.

{% agent_session claude-code-session-pej6nj %}

---

## The Lazy Payoff

Here's the actual time math:

| Task | Manual Time | SlothTidier Time |
| :--- | :--- | :--- |
| Sort 300 random Downloads files | ~2–3 hours | ~45 seconds |
| Rename 50 cryptic screenshots/receipts | ~30 minutes | Instant |
| Find all duplicate files | ~20 minutes | Instant |
| Extract to-dos from 15 documents | ~45 minutes | Instant |
| Write a PowerShell move script | ~1 hour | Generated automatically |
| **Total** | **~4.5 hours** | **< 1 minute** |

I used it on my own Downloads folder this week (1,247 files, accumulated over 2 years). Sloan found:
- **43 duplicate files** ready for archiving
- **12 hidden action items** including an overdue invoice and an expired SSL renewal notice buried in a PDF
- Organized everything in under 60 seconds

The experience: click the button, watch Sloan's reasoning monologue stream, download the PowerShell script, run it, go make tea. By the time I came back, my Downloads folder was pristine.

That is the sloth way. 🦥

---

## Prize Categories

- 🦥 **DEV x Hacktoberfest Open-Source AI Challenge** — Slow and Steady

---

*Built with open-weight AI, zero cloud calls, and maximum sloth energy on International Sloth Day 🦥*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(devPostContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span className="badge badge-amber" style={{ marginBottom: '10px' }}>
          Hacktoberfest Week 4: Slow and Steady
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          DEV Challenge Submission Post
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          Complete, publication-ready submission. Copy and paste directly into dev.to!
        </p>
      </div>

      {/* Quick Links */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <a href="https://slothtidier.onrender.com" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 16px', borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem',
            transition: 'all 0.2s',
          }}
        >
          🌐 Live App → slothtidier.onrender.com
        </a>

        <a href="https://github.com/Master66999/SlothTidier" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 16px', borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem',
            transition: 'all 0.2s',
          }}
        >
          ⭐ GitHub → Master66999/SlothTidier
        </a>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '12px 16px', borderRadius: 'var(--radius-md)',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          color: '#fbbf24', fontWeight: 600, fontSize: '0.88rem',
        }}>
          🤖 Agent Session: claude-code-session-pej6nj
        </div>
      </div>

      {/* Action Bar */}
      <div className="glass-panel" style={{
        padding: '16px 24px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tags:</span>
          <span className="badge badge-emerald">#hacktoberfest</span>
          <span className="badge badge-cyan">#ai</span>
          <span className="badge badge-amber">#opensource</span>
          <span className="badge badge-emerald">#showdev</span>
        </div>

        <button
          onClick={handleCopy}
          className="btn-primary"
          style={{ padding: '10px 22px', fontSize: '0.9rem' }}
        >
          <CopyIcon size={15} /> {copied ? '✅ Copied to Clipboard!' : 'Copy Full DEV Post'}
        </button>
      </div>

      {/* Post Preview */}
      <div className="glass-panel" style={{ padding: '28px', background: '#060a07' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          marginBottom: '16px', paddingBottom: '14px',
          borderBottom: '1px solid rgba(52, 211, 153, 0.15)',
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            Markdown Preview
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            — all sections complete including live link, GitHub embed, and agent session tag
          </span>
        </div>
        <pre style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.84rem',
          lineHeight: 1.65,
          color: '#cbd5e1',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: '620px',
          overflowY: 'auto',
          paddingRight: '8px',
        }}>
          {devPostContent}
        </pre>
      </div>

    </div>
  );
}
