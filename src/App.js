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
// import RestAPI from "./RestAPI.js";
import SpotifySearch from './routes/spotifySearch';

const App = () => {
  return (
    <div className='App'>
      <Sidebar />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/music" element={<MusicPage />} /> 
          {/* <Route path="/feed" element={<Feed />} />
          <Route path="/search" element={<Search />} />
          */}
          <Route path="/start" element={<StartScreen/>} />
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/signup" element={<SignupScreen/>} />
          <Route path="/llllogin" element={<SignInSide/>} />
          <Route path="/spotifySearch" element={<SpotifySearch/>} />
          <Route path="/spotify" element={<SpotifyPlayerComponent/>} />
        </Routes>
    </div>
  );  
};

export default App;