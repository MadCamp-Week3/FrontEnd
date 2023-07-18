import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../css/MyPage.css';
import MusicPage from './RoomsScreen';
import Component1 from '../components/Component1';
import Component2 from '../components/Component2';
import Component3 from '../components/Component3';


const MyPage = () => {
  const [activeButton, setActiveButton] = useState('posts');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const renderContent = () => {
    if (activeButton === 'posts') {
      return <Component1 />;
    } else if (activeButton === 'achievements') {
      return <Component2 />;
    } else if (activeButton === 'recommendedMusic') {
      return <Component3 />;
    }
    };

  const profilePicUrl = 'https://example.com/profile-pic.jpg';
  const profileMusic = 'https://example.com/profile-music.mp3';
  const followers = 100;

  const handleMoreClick = () => {
    // 더보기 버튼 클릭 시 동작할 로직을 작성하세요.
    // 예를 들어, 추가 정보를 보여줄 모달을 열거나 페이지를 이동하는 등의 동작이 있을 수 있습니다.
  };

  return (
    // <Router>
    <div className="container">
      <div className="main-content">
        <h1>마이 페이지</h1>
        <img src={profilePicUrl} alt="프로필 사진" />
        <audio src={profileMusic} controls />
        <div>팔로우 수: {followers}</div>
        <button onClick={handleMoreClick}>더보기</button>

        <div className="buttons">
          <div 
            onClick={() => handleButtonClick('posts')}
            className={activeButton === 'posts' ? 'active' : ''}>
              내 플레이리스트
          </div>
          <div 
            onClick={() => handleButtonClick('achievements')}
            className={activeButton === 'achievements' ? 'active' : ''}>
              업적
          </div>
          <div 
            onClick={() => handleButtonClick('recommendedMusic')}
            className={activeButton === 'recommendedMusic' ? 'active' : ''}>
              좋아하는 아티스트
          </div>
        </div>

        <div className="content">{renderContent()}</div>
      </div>
    </div>

    
    // {/* </Router> */}
  );
};

export default MyPage;
