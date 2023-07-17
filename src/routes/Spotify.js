import React, { useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const SpotifyPlayerComponent = () => {
  useEffect(() => {
    const token = 'BQCGupGelSu-XGJBiv5Fawhf8u90sk1m4OPwzEIFGxdwT0jNuLYbZPKNy9K8I4T8tjzemrYFCdt_M1bm0zUWanBxOBEfbYUQjyoxJTXzsXdWaH5SQd_Of4TjdSLPF8UhkHhgQtphOO7Kucd9b-ZmJlqtWs69aIdWg5QXPimSuSzZ8Zpa7mkzV-IP75G_p3p4Loxkz9gVasbWrfdxzIAXkZ5SCmJnOxQh';

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
