import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing Backend Startup...');

// Test if backend can start without errors
const backendProcess = spawn('node', ['src/index.ts'], {
  cwd: join(__dirname, 'backend'),
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env, NODE_ENV: 'test' }
});

let output = '';
let errorOutput = '';

backendProcess.stdout.on('data', (data) => {
  output += data.toString();
});

backendProcess.stderr.on('data', (data) => {
  errorOutput += data.toString();
});

backendProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Backend started successfully');
    console.log('Output:', output);
  } else {
    console.log('❌ Backend failed to start');
    console.log('Error:', errorOutput);
    process.exit(1);
  }
});

// Kill the process after 5 seconds
setTimeout(() => {
  backendProcess.kill();
  console.log('✅ Backend startup test completed');
}, 5000); 