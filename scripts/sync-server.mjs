import http from 'node:http';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.SUMYU_SYNC_PORT || 8082;
const TARGET = process.argv[2] || process.env.SUMYU_REPO_PATH || '';

const ALLOWED_ORIGINS = ['http://localhost:4321', 'http://127.0.0.1:4321'];

function runSync() {
  return new Promise((resolve, reject) => {
    if (!TARGET) {
      reject(new Error('缺少目标仓库路径，请在启动 sync-server 时传入'));
      return;
    }

    const child = spawn('node', [path.join(__dirname, 'sync-to-repo.mjs'), TARGET], {
      stdio: 'pipe',
      cwd: path.resolve(__dirname, '..'),
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(stderr || `同步脚本退出码 ${code}`));
      }
    });

    child.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/sync') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }

  try {
    const { stdout, stderr } = await runSync();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, stdout, stderr }));
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: e.message }));
  }
});

server.listen(PORT, () => {
  console.log(`[sync-server] 运行在 http://localhost:${PORT}`);
  console.log(`[sync-server] 目标仓库: ${TARGET || '未设置'}`);
});
