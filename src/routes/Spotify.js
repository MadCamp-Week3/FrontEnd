import React, { useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const SpotifyPlayerComponent = () => {
  useEffect(() => {
    const token = 'BQCKUhNX70JAJlT_vLyI7K-zqfrqzQqIuzylE6VxBkORNpKZ7r75MW9cddJOiuoJlWPNjXI2TTIqgwROeCt_v5BQyhubBKUp7XCL1qczTc-ANPvFj7f_QSIyZHF0Q_TxwIj9HCI6V4m7Rq-WrX_EwHwsgpsl6Uz52G5vKhy2zy_uSMuj0vgF1585o3x8xKKJcHTUL2gonw8DivLRY2Dm-2ZFM27MDTec';

    // 플레이어 준비
    const handleReady = ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    };

    // 플레이어 준비 안됨
    const handleNotReady = ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    };

    // 초기화 오류
    const handleInitializationError = ({ message }) => {
      console.error(message);
    };

    // 인증 오류
    const handleAuthenticationError = ({ message }) => {
      console.error(message);
    };

    // 계정 오류
    const handleAccountError = ({ message }) => {
      console.error(message);
    };

    // 이벤트 리스너 등록
    const playerListeners = {
      ready: handleReady,
      not_ready: handleNotReady,
      initialization_error: handleInitializationError,
      authentication_error: handleAuthenticationError,
      account_error: handleAccountError,
    };

    // 플레이어 설정
    const playerOptions = {
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb) => cb(token),
      volume: 0.5,
    };

    return () => {
      // 컴포넌트 언마운트 시 플레이어 정리
      // (필요에 따라 추가)
    };
  }, []);

  return (
    <div>
      <h1>Spotify Web Playback SDK Quick Start</h1>
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
      <button onClick={() => console.log('Toggle Play')}>Toggle Play</button>
      <SpotifyPlayer />
    </div>
  );
};

export default SpotifyPlayerComponent;
