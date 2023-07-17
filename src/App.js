import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './routes/StartScreen';
import SignupScreen from './routes/SignupScreen';
import LoginScreen from './routes/LoginScreen';
import HomePage from './routes/HomePage';
import MusicPage from './routes/MusicPage';
import MyPage from './routes/MyPage';
import Sidebar from './routes/Sidebar';
import SignInSide from './routes/SignInSide';
import SpotifyPlayerComponent from './routes/Spotify';
import SpotifySearch from './routes/spotifySearch';
import SpotifyPlayer from './routes/SpotifyPlayer';

export const TokenContext = createContext();

const App = () => {
  const CLIENT_ID = "8dfdcd03dc99405ea6a805c7cb932859";
  const REDIRECT_URI = "http://localhost:3000/mypage";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <TokenContext.Provider value={{ token, setToken, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT }}>
      <div className='App'>
      {/* <script src="https://sdk.scdn.co/spotify-player.js"></script> */}
        <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/start" element={<StartScreen/>} />
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/signup" element={<SignupScreen/>} />
            <Route path="/llllogin" element={<SignInSide/>} />
            <Route path="/spotifySearch" element={<SpotifySearch/>} />
            <Route path="/spotify" element={<SpotifyPlayerComponent/>} />
            <Route path="/spotifyPlayer" element={<SpotifyPlayer/>} />
          </Routes>
      </div>
    </TokenContext.Provider>
  );  
};

export default App;
