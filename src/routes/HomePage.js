import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='main-content'>
      <h1>Music</h1>
      <Link to='/login'>로그인하러 가기</Link>
    </div>
    );
};

export default HomePage;