import React, { useEffect, useRef } from 'react';

const SpotifyPlayer = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (window.Spotify) {
      playerRef.current = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      // Error handling
      playerRef.current.addListener('initialization_error', ({ message }) => { console.error(message); });
      playerRef.current.addListener('authentication_error', ({ message }) => { console.error(message); });
      playerRef.current.addListener('account_error', ({ message }) => { console.error(message); });

      // Playback status updates
      playerRef.current.addListener('player_state_changed', state => { console.log(state); });

      // Ready
      playerRef.current.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      playerRef.current.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      playerRef.current.connect();
    }
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      playerRef.current.togglePlay();
    }
  };

  return (
    <div>
      <h1>Spotify Web Playback SDK Quick Start</h1>
      <button id="togglePlay" onClick={togglePlay}>Toggle Play</button>
      {/* <script src="https://sdk.scdn.co/spotify-player.js"></script> */}
    </div>
  );
};

export default SpotifyPlayer;
