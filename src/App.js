import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './routes/StartScreen';
import SigninScreen from './routes/SigninScreen';
import LoginScreen from './routes/LoginScreen';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<StartScreen/>} />
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/signin" element={<SigninScreen/>} />
        </Routes>
      </Router>
    </div>
  );  
};

export default App;