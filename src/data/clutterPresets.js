// Preset datasets representing common real-world clutter nightmare scenarios

export const CLUTTER_PRESETS = [
  {
    id: 'chaotic-downloads',
    title: '📁 The 300-Item Downloads Swamp',
    subtitle: 'The folder you haven\'t cleaned since 2024',
    badge: 'Most Relatable',
    files: [
      { name: 'Screenshot 2026-10-14 at 11.23.18.png', size: '2.4 MB', type: 'image/png', preview: 'Stripe customer invoice showing payment processed for $189.00 on Oct 14' },
      { name: 'invoice_final_really_v2(1).pdf', size: '420 KB', type: 'application/pdf', preview: 'Client Freelance Retainer Invoice: $3,200 due within 15 days' },
      { name: 'zoom_meeting_recording_GMT20261019-142210.mp4', size: '148 MB', type: 'video/mp4', preview: 'Q4 Product Roadmap Sync with Design Team' },
      { name: 'netflix_cancel_letter_draft.docx', size: '34 KB', type: 'application/docx', preview: 'Draft letter to customer support requesting cancellation confirmation' },
      { name: 'docker-compose.backup.yml', size: '12 KB', type: 'text/yaml', preview: 'Local postgres and redis container setup with staging ports' },
      { name: 'medical_lab_results_oct_signed.pdf', size: '890 KB', type: 'application/pdf', preview: 'Comprehensive Blood Metabolic Panel. Note: Doctor suggests Vitamin D checkup' },
      { name: 'temp_notes_todo_dump.txt', size: '4 KB', type: 'text/plain', preview: 'Buy oat milk, renew car insurance by Nov 3, send draft to Sarah' },
      { name: 'IMG_9942_receipt_gas.JPG', size: '3.1 MB', type: 'image/jpeg', preview: 'Chevron Fuel Receipt $54.20, tax deductible mileage trip' },
      { name: 'IMG_9942_receipt_gas(1).JPG', size: '3.1 MB', type: 'image/jpeg', preview: 'Exact duplicate of Chevron Fuel Receipt from accidental second click' },
    ]
  },
  {
    id: 'tax-receipts',
    title: '🧾 Tax Season & Receipts Nightmare',
    subtitle: 'Receipts and statements you dread opening',
    badge: 'High Anxiety',
    files: [
      { name: 'Scan_001923.jpg', size: '4.8 MB', type: 'image/jpeg', preview: 'Home office desk purchase receipt from Herman Miller, total $940' },
      { name: 'amazon_order_114-88921-78219.pdf', size: '310 KB', type: 'application/pdf', preview: 'Ergonomic keyboard and USB-C hub business expense' },
      { name: 'W2_2025_draft_scanned.pdf', size: '1.2 MB', type: 'application/pdf', preview: 'Wage and Tax Statement for 2025 fiscal filing' },
      { name: 'uber_eats_receipt_nov.png', size: '1.1 MB', type: 'image/png', preview: 'Personal midnight taco order - not tax deductible' },
      { name: 'stripe_payout_statement_q3.csv', size: '85 KB', type: 'text/csv', preview: 'Quarterly payout breakdown totaling $14,280 gross revenue' },
      { name: 'Scan_001923_copy.jpg', size: '4.8 MB', type: 'image/jpeg', preview: 'Accidental duplicate scan of Herman Miller desk' },
      { name: 'health_insurance_form_1095B.pdf', size: '540 KB', type: 'application/pdf', preview: 'Proof of health coverage for state tax return' },
    ]
  },
  {
    id: 'dev-scratchpad',
    title: '💻 The Midnight Dev Scratchpad',
    subtitle: 'Abandoned scripts, secrets, and half-baked ideas',
    badge: 'Dangerous Clutter',
    files: [
      { name: 'test_quick_scraping.py', size: '8 KB', type: 'text/x-python', preview: 'import requests; beautifulsoup parser for competitor price monitoring' },
      { name: 'Untitled-1.sql', size: '14 KB', type: 'text/sql', preview: 'SELECT user_id, count(*) FROM sessions WHERE created_at > NOW() - INTERVAL 7 DAY;' },
      { name: 'production_keys_backup_do_not_share.env', size: '2 KB', type: 'text/plain', preview: 'STRIPE_SECRET=sk_live_99... DATABASE_URL=postgres://aws...' },
      { name: 'dump_users_log_20261012.txt', size: '450 KB', type: 'text/plain', preview: 'Debug trace log with 1,200 rows of HTTP 200/500 response headers' },
      { name: 'api_benchmark_results.json', size: '32 KB', type: 'application/json', preview: 'Latency benchmarks comparing local Qwen 8B vs cloud endpoints' },
      { name: 'scratch_notes_final.md', size: '5 KB', type: 'text/markdown', preview: '# Architecture ideas for Sloth Agent: reward user laziness with local AI' },
    ]
  }
];
