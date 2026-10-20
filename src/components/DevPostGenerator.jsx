import React, { useState } from 'react';
import { CopyIcon, SparklesIcon, FileTextIcon, ShieldCheckIcon } from './Icons';

export function DevPostGenerator({ modelStatus }) {
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState('raw'); // 'raw' | 'rendered'

  const devPostContent = `---
title: "Slow and Steady: Meet SlothTidier, the Offline AI Agent That Tidies Your Digital Clutter While You Nap 🦥"
published: true
tags: hacktoberfest, ai, opensource, showdev
cover_image: https://raw.githubusercontent.com/Master66999/apiintegration/main/public/cover-image.jpg
canonical_url: false
description: "Channel your inner sloth for International Sloth Day. An open-weight AI agent powered by Qwen3 8B that autonomously cleans your Downloads folder, renames chaotic files, and extracts hidden to-dos—100% offline with zero cloud leakage."
---

## 🦥 The Sloth Philosophy: Slow and Steady

Tomorrow, October 20, is **International Sloth Day**, and sloths have life figured out. They move at their own unbothered pace, conserve their precious energy, and let nature take its course.

As developers and digital citizens, we tend to do the exact opposite. We accumulate hundreds of chaotic files in our Downloads folder:
- \`Screenshot 2026-10-14 at 11.23.18.png\` (is it a receipt? a meme? a bug report?)
- \`invoice_final_really_v2(1).pdf\` (what client was this for?)
- \`Untitled-1.sql\` and \`test_scraping.py\` (abandoned midnight experiments)
- \`medical_lab_results_oct_signed.pdf\` (buried under 80 random zip files)

We know we need to clean it. But manual filing is the single most dreaded, energy-draining chore on a computer.

So this week, for DEV's **"Slow and Steady" Hacktoberfest Challenge**, I channeled my inner sloth and built **SlothTidier**: an autonomous desktop file organizer powered by an open-weight model (**Qwen3 8B**) that does the work so you don't have to.

You dump the clutter. Sloan the Sloth snoozes, stretches, analyzes the contents locally, standardizes every file name, sorts them into smart folders, extracts hidden to-dos, and hands you an executable one-click script.

---

## 💡 What I Built

**SlothTidier** is a local-first web application and agent harness that integrates directly with local open-weight inference (via Ollama):

1. **The Lazy Dumpster**: Drag & drop your real messy files or test with instant realistic presets (*"The 300-Item Downloads Swamp"*, *"Tax Season Nightmare"*, *"Midnight Dev Scratchpad"*).
2. **Autonomous Sloth Inference**:
   - **True Sloth Mode**: Streams the open-weight model's internal thinking tokens (\`<think>\`), letting you watch Sloan's internal monologue as he contemplates file extensions and dates.
   - **Brisk Sloth Mode**: Fast JSON schema extraction.
3. **Smart Renaming & Taxonomy**:
   - Renames cryptic filenames into clean, semantic conventions (e.g. \`Scan_001923.jpg\` ➔ \`invoice-herman-miller-desk-oct2026.jpg\`).
   - Routes into organized folders (\`01_Finances_&_Receipts\`, \`02_Work_&_Contracts\`, \`03_Dev_&_Configs\`, \`04_Personal_Health\`).
4. **Duplicate & Junk Detection**: Flags duplicate scans, accidental downloads (\`(1)\`), and stale logs ready for immediate archiving.
5. **Action Item Extraction**: Discovers deadlines, tax deductions, and payment obligations buried in the clutter.
6. **One-Click Real Execution**:
   - Generates a custom **PowerShell script (\`.ps1\`)** or **Bash script (\`.sh\`)** that you can run locally to move and rename your actual physical files in seconds.
   - Export full JSON/Markdown manifest.

---

## 🔓 Why Open Innovation Matters for SlothTidier

The theme of this challenge asks: *Where does an open-based approach work better than a closed one?* 

For SlothTidier, open innovation is not an afterthought—**it is the only reason this tool can safely exist:**

### 1. Zero Cloud Data Leakage (Absolute Privacy)
Your chaotic Downloads folder contains the most sensitive data in your digital life: tax returns, pay stubs, medical test results, bank statements, client NDAs, and \`.env\` backup keys. 
Sending these files or their text snippets to a commercial closed API (like OpenAI or Anthropic) means transferring your private life onto servers you do not control.
With **Qwen3 8B** running locally on Ollama via \`http://127.0.0.1:11434\`, **zero bytes of personal data ever leave your machine**. 

### 2. $0.00 Infinite Inference (True Carefree Laziness)
A closed API bills you per thousand tokens. If you have 300 messy files, you are mentally calculating whether tidying your computer is worth $0.25 on your credit card.
With open weights, you download the GGUF model once. You can tidy 10 files, 1,000 files, or 100,000 files for **literally $0.00**.

### 3. Works 100% Offline (The Airplane Test)
When do people actually clean their messy laptops? On 6-hour airplane flights, during train rides, or while off-grid at a cabin. Commercial cloud models fail the second you switch to airplane mode. SlothTidier runs entirely on local silicon with no internet connection required.

### 4. Sovereignty and Model Freedom
If you prefer Llama 3.2, Mistral NeMo, Phi-4, or your own LoRA fine-tune, you simply change the model parameter in Ollama. You are never subject to API deprecation, sudden rate limits, or arbitrary service policy shifts.

---

## 🛠️ Technical Stack & Architecture

- **Open-Weight Core**: Qwen3 8B (8.2B parameter open model with thinking/reasoning tags)
- **Local Inference Engine**: Ollama (\`127.0.0.1:11434\`) with automatic fallback heuristic engine
- **Frontend**: Vite + React 19
- **Design System**: Vanilla CSS with glassmorphism, tailored forest-moss palette, and animated sloth micro-interactions
- **Automation Pipeline**: PowerShell Core & POSIX Bash script generator

---

## 🚀 How to Run It Locally

\`\`\`bash
# 1. Clone the repository
git clone https://github.com/Master66999/apiintegration.git
cd apiintegration

# 2. Start local open-weight model in Ollama (if installed)
ollama run qwen3:8b

# 3. Install dependencies and start the app
npm install
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173), choose a messy clutter preset or drop your own files, click **"Tidy My Mess"**, and go take a nap!

---

## 🌿 Final Thoughts

Sloths remind us that moving slow doesn't mean standing still—it means being deliberate, conserving energy, and building smart systems. Open-source AI gives us sovereign, private, and cost-free intelligence on our own machines.

Happy International Sloth Day! Now close your tabs, let the AI clean your files, and go enjoy a well-deserved rest.
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
          Complete, publication-ready submission post answering all challenge prompts. One-click copy directly to dev.to!
        </p>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tags:</span>
          <span className="badge badge-emerald">#hacktoberfest</span>
          <span className="badge badge-cyan">#ai</span>
          <span className="badge badge-amber">#opensource</span>
          <span className="badge badge-emerald">#showdev</span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCopy}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
          >
            <CopyIcon size={14} /> {copied ? 'Copied to Clipboard!' : 'Copy DEV Markdown'}
          </button>
        </div>
      </div>

      {/* Post Viewer Box */}
      <div className="glass-panel" style={{ padding: '28px', background: '#070b08' }}>
        <pre style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.86rem',
          lineHeight: 1.6,
          color: '#e2e8f0',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: '650px',
          overflowY: 'auto',
          paddingRight: '12px',
        }}>
          {devPostContent}
        </pre>
      </div>

    </div>
  );
}
