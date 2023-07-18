import React, { useEffect, useRef } from 'react';

// const SpotifyPlayer = () => {
//   const playerRef = useRef(null);
//   const token = 'BQC4Efeh4GIGSDSUY8nXHZ8A5mPg5LgUb9G8gpQDjJND-0MGW6MVTBhYRgraONquY5yrbnU0suhDgZFw8kCqeKvK38TBgDePG4T69uKDBoQyuzDsgn_9VSKEeZMELnQ5PZLqXdFHaxsMcStkhPyoR9pMW81zAd1gth3Gq3VM_v7o9xMhAnWk_oRZpKHNsG-1XEeVYez62pINnDEl86GMLEOSP5fjrPqk';

//   useEffect(() => {
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       playerRef.current = new window.Spotify.Player({
//         name: 'Web Playback SDK Quick Start Player',
//         getOAuthToken: cb => { cb(token); },
//         volume: 0.5
//       });

//       // Error handling
//       playerRef.current.addListener('initialization_error', ({ message }) => { console.error(message); });
//       playerRef.current.addListener('authentication_error', ({ message }) => { console.error(message); });
//       playerRef.current.addListener('account_error', ({ message }) => { console.error(message); });

//       // Playback status updates
//       playerRef.current.addListener('player_state_changed', state => { console.log(state); });

//       // Ready
//       playerRef.current.addListener('ready', ({ device_id }) => {
//         console.log('Ready with Device ID', device_id);
//       });

//       // Not Ready
//       playerRef.current.addListener('not_ready', ({ device_id }) => {
//         console.log('Device ID has gone offline', device_id);
//       });

//       // Connect to the player!
//       playerRef.current.connect();
//     };

//     return () => {
//       window.onSpotifyWebPlaybackSDKReady = null;
//     };
//   }, [token]);

//   const togglePlay = () => {
//     playerRef.current && playerRef.current.togglePlay();
//   };

//   return (
//     <div>
//       <button onClick={togglePlay}>Toggle Play</button>
//     </div>
//   );
// };
class SpotifyPlayer extends React.Component {
  componentDidMount() {
    // Spotify Web Player SDK 초기화
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = 'BQC4Efeh4GIGSDSUY8nXHZ8A5mPg5LgUb9G8gpQDjJND-0MGW6MVTBhYRgraONquY5yrbnU0suhDgZFw8kCqeKvK38TBgDePG4T69uKDBoQyuzDsgn_9VSKEeZMELnQ5PZLqXdFHaxsMcStkhPyoR9pMW81zAd1gth3Gq3VM_v7o9xMhAnWk_oRZpKHNsG-1XEeVYez62pINnDEl86GMLEOSP5fjrPqk';
      const player = new window.Spotify.Player({
        name: 'MusicApp',
        getOAuthToken: (cb) => { cb(token); }
      });

      // SDK 인스턴스 초기화 및 이벤트 핸들러 등록 등 필요한 작업 수행
      player.addListener('ready', ({ device_id }) => {
        console.log('Player ready with Device ID', device_id);
      });

      // SDK를 시작하고 연결을 시도
      player.connect();
    };

    // Spotify Web Player SDK 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    document.body.appendChild(script);
  }

  render() {
    return <div>Spotify Player Component</div>;
  }
}

export default SpotifyPlayer;
