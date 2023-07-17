import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './MyPage.css';
import MusicPage from './MusicPage';

const MyPage = () => {
  const [activeButton, setActiveButton] = useState('posts');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const renderContent = () => {
    if (activeButton === 'posts') {
      return (
        <div>
          <h2>게시글 컴포넌트</h2>
          {/* 게시글 내용 */}
        </div>
      );
    } else if (activeButton === 'achievements') {
      return (
        <div>
          <h2>업적 컴포넌트</h2>
          {/* 업적 내용 */}
        </div>
      );
    } else if (activeButton === 'recommendedMusic') {
      return (
        <div>
          <h2>추천 음악 컴포넌트</h2>
          {/* 추천 음악 내용 */}
        </div>
      );
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
        <button
            onClick={() => handleButtonClick('posts')}
            className={activeButton === 'posts' ? 'active' : ''}
        >
            게시글
        </button>
        <button
            onClick={() => handleButtonClick('achievements')}
            className={activeButton === 'achievements' ? 'active' : ''}
        >
            업적
        </button>
        <button
            onClick={() => handleButtonClick('recommendedMusic')}
            className={activeButton === 'recommendedMusic' ? 'active' : ''}
        >
            추천 음악
        </button>
        </div>

        <div className="content">{renderContent()}</div>
    </div>
    </div>

    
    // {/* </Router> */}
  );
};

export default MyPage;
