import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './routes/StartScreen';
import SignupScreen from './routes/SignupScreen';
import LoginScreen from './routes/LoginScreen';
import HomeScreen from './routes/HomeScreen';
import RoomsScreen from './routes/RoomsScreen';
import SearchScreen from './routes/SearchScreen';
import MyPage from './routes/MyPage';
import Sidebar from './routes/Sidebar';
// import RestAPI from "./RestAPI.js";

import './App.css'
import HighlightScreen from './routes/HighlightScreen';
import StoriesTest from './routes/StoriesTest';
import Test from './routes/test';

const App = () => {
  return (
    <div className='App'>
      <div className='Sidebar-container'>
        <Sidebar />
      </div>
      <div className='Content'>
        <Routes>
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/signup" element={<SignupScreen/>} />
          
          <Route path="/" element={<HomeScreen />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/rooms" element={<RoomsScreen />} /> 
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/start" element={<StartScreen/>} />
          
          <Route path="/highlight" element={<HighlightScreen />} />

          <Route path="/stories" element={<StoriesTest />} />

          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;