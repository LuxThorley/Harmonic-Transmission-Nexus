import React from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import { useEffect, useRef } from 'react';

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      autoplay: true,
      controls: true,
      sources: [{
        src: 'http://localhost:10000/live/stream.m3u8',
        type: 'application/x-mpegURL'
      }]
    });

    return () => player.dispose();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">HTN: Harmonic Transmission Nexus</h1>
      <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="360" />
    </div>
  );
}

export default App;
