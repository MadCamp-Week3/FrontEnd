import React from 'react';
import { Link } from 'react-router-dom';

const StartScreen = () => {
  return (
    <div>
      <h1>Welcome to the Start Screen</h1>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/signup"><button>Sign Up</button></Link>
    </div>
  );
};

export default StartScreen;