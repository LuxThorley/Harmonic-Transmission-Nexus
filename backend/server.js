const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use('/live', express.static(path.join(__dirname, 'public/live')));

// Ensure HLS output directory exists
const hlsDir = path.join(__dirname, 'public/live');
if (!fs.existsSync(hlsDir)) fs.mkdirSync(hlsDir, { recursive: true });

// Start FFmpeg to pull stream from Malcolm API and convert to HLS
const ffmpeg = spawn('ffmpeg', [
  '-i', 'https://malcolm-ai.onrender.com/live-stream', // Malcolm AI API endpoint
  '-c:v', 'libx264',
  '-c:a', 'aac',
  '-f', 'hls',
  '-hls_time', '5',
  '-hls_list_size', '6',
  '-hls_flags', 'delete_segments',
  path.join(hlsDir, 'stream.m3u8')
]);

ffmpeg.stderr.on('data', (data) => {
  console.error('FFmpeg Error:', data.toString());
});

ffmpeg.on('close', (code) => {
  console.log(`FFmpeg process exited with code ${code}`);
});

app.listen(PORT, () => {
  console.log(`🚀 HTN Server running and streaming on port ${PORT}`);
});
