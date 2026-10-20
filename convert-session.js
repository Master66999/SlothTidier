import fs from 'fs';

const lines = fs.readFileSync('sloth-tidier-agent-session.jsonl', 'utf8').trim().split('\n');
const items = lines.map(line => {
  try { return JSON.parse(line); } catch (e) { return null; }
}).filter(Boolean);

// 1. Raw JSON array of all steps
fs.writeFileSync('session-sloth-tidier.json', JSON.stringify(items, null, 2));

// 2. Structured session format (Gemini CLI / OpenCode / standard agent format)
const messages = items
  .filter(item => item.content || item.tool_calls)
  .map(item => ({
    role: (item.source === 'USER_EXPLICIT' || item.type === 'USER_INPUT') ? 'user' : 'assistant',
    type: item.type,
    content: item.content || '',
    tool_calls: item.tool_calls || undefined,
    created_at: item.created_at
  }));

const sessionObj = {
  sessionId: '9de536bc-bfe4-43af-9436-6711bc67f278',
  title: 'SlothTidier - Slow and Steady Agent Session',
  tool: 'Gemini CLI',
  createdAt: items[0]?.created_at || new Date().toISOString(),
  messages: messages,
  events: items
};

fs.writeFileSync('session-gemini-cli.json', JSON.stringify(sessionObj, null, 2));
console.log('Successfully generated session JSON files with', items.length, 'steps');
