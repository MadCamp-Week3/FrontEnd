import axios from 'axios';
import React, { useEffect, useRef, useContext } from 'react';
import { TokenContext } from '../App';  // Assume your App component is one level up in the directory

const SpotifyPlayer = () => {
  const { token, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT } = useContext(TokenContext);
  const playerRef = useRef(null);
  
  useEffect(() => {
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

      console.log('connecting to Spotify');

      // Connect to the player!
      playerRef.current.connect().then(success => {
        if(success) {
          console.log('Successfully connected to Spotify');
        }
      })
    }
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      playerRef.current.togglePlay();
    }
  };

  const playSong = async () => {
    const songUri = 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr';

    axios.put('https://api.spotify.com/v1/me/player/play', {
      context_uri: songUri,
      offset: {
        position: 5
      },
      position_ms: 0
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }). then(reponse => {
      console.log("play request successful", reponse);
    }). catch(error => {
      console.error('Error in play request', error);
    })
      
  }

  return (
    <div>
      <h1>Spotify Web Playback SDK Quick Start</h1>
      <div id="togglePlay" onClick={togglePlay}>Toggle Play</div>
      <div onClick={playSong}>play something</div>
      {/* <script src="https://sdk.scdn.co/spotify-player.js"></script> */}
    </div>
  );
};

export default SpotifyPlayer;
