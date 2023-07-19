import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../css/MyPage.css';
import MusicPage from './RoomsScreen';
import MyPlaylists from '../components/MyPlaylists';
import Component2 from '../components/Component2';
import Component3 from '../components/Component3';


const MyPage = () => {
  const [activeButton, setActiveButton] = useState('posts');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      fetchProfile(access_token).then(profileData => setProfile(profileData));
      console.log(profile);
    }
  }, []);

  const fetchProfile = async (access_token) => {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${access_token}` }
    });
    console.log(result);
    return await result.json();
  }

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const renderContent = () => {
    if (activeButton === 'posts') {
      return <MyPlaylists />;
    } else if (activeButton === 'achievements') {
      return <Component2 />;
    } else if (activeButton === 'recommendedMusic') {
      return <Component3 />;
    }
  };

  const handleMoreClick = () => {
    // 더보기 버튼 클릭 시 동작할 로직을 작성하세요.
    // 예를 들어, 추가 정보를 보여줄 모달을 열거나 페이지를 이동하는 등의 동작이 있을 수 있습니다.
  };

  return (
      <div className="my-page">
        {profile && (
          <div className='profile-info'>
            <h1>Welcome {profile.display_name} !</h1>
            <div className="profile">
              <div className='profile-image'>
                {profile.images && profile.images.length > 0 && <img src={profile.images[0].url} alt="Profile" />}
              </div>
              <div className='profile-details'>
                <div className='profile-details-item'>
                  <div className='key'>User ID</div>
                  <div className='value'>{profile.id}</div>
                </div>
                <div className='profile-details-item'>
                  <div className='key'>Email</div>
                  <div className='value'>{profile.email}</div>
                </div>

                <a href={profile.uri}>
                  <div className='open-in-spotify'>
                    Open profile in Spotify
                  </div>
                </a>
              
              </div>
            </div>
          </div>
        )}
        <div className="buttons">
          {/* <button
            onClick={() => handleButtonClick('posts')}
            className={activeButton === 'posts' ? 'active' : ''}
          >
            내 플레이리스트
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
            좋아하는 아티스트
          </button> */}

        </div>

        <div className="content">{renderContent()}</div>
      </div>
   );
};

export default MyPage;
