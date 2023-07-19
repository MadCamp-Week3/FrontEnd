import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './routes/StartScreen';
import SignupScreen from './routes/SignupScreen';
import LoginScreen from './routes/LoginScreen';
import HomeScreen from './routes/HomeScreen';
import RoomsScreen from './routes/RoomsScreen';
import SearchScreen from './routes/SearchScreen';
import MyPage from './routes/MyPage';
import Sidebar from './routes/Sidebar';
import SignInSide from './routes/SignInSide';
import SpotifyPlayerComponent from './routes/Spotify';
import SpotifySearch from './routes/spotifySearch';
import SpotifyPlayer from './routes/SpotifyPlayer';
import SpotifyProfile from './routes/SpotifyProfile';
import SpotifyProfile2 from './routes/SpotifyProfile2';

import './App.css'
import HighlightScreen from './routes/HighlightScreen';
import Test from './routes/test';

export const UserContext = createContext(null);
export const TokenContext = createContext();


const App = () => {
  const CLIENT_ID = "8dfdcd03dc99405ea6a805c7cb932859";
  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }


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
    <UserContext.Provider value={{ user, setUser }}>
    <TokenContext.Provider value={{ token, setToken, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT }}>
      <div className='App'>
        {/* <script src="https://sdk.scdn.co/spotify-player.js"></script> */}
        <div className='Sidebar-container'>
          <Sidebar />
        </div>
        <div className='Content'>
          <Routes>
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/signup" element={<SignupScreen/>} />
            
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/rooms" element={<RoomsScreen />} /> 
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/start" element={<StartScreen/>} />
            
            <Route path="/highlight/:highlightId" element={<HighlightScreen />} />

            <Route path="/test" element={<Test />} />

            <Route path="/llllogin" element={<SignInSide/>} />
            <Route path="/spotifySearch" element={<SpotifySearch/>} />
            <Route path="/spotify" element={<SpotifyPlayerComponent/>} />
            <Route path="/spotifyPlayer" element={<SpotifyPlayer/>} />
            {/* <Route path="/spotifyProfile" element={<SpotifyProfile/>}/> */}
            <Route path="/spotifyProfile2" element={<SpotifyProfile2/>}/>
          </Routes>
        </div>
      </div>
    </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
