import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';
import '../css/LinkStyles.css';
import LifeMusicIcon from '../images/LifeMusicIcon.png';
import Avatar from '@mui/material/Avatar';

function Sidebar() {
  
  return (
    <div className="sidebar" style={{ display: 'flex', alignItems: 'flex-start' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar sx={{ m: 1, bgcolor: 'white' }}>
      <img src={LifeMusicIcon} alt="Life Music Icon" style={{ width: '60%', height: 'auto' }} />
    </Avatar>
    <div className="logo-frame-wrapper" style={{ marginLeft: '8px', fontSize: '20px' }}>
      <span>Life Music</span>
    </div>
  </div>

      <div className="sidebar-menu">
        <Link to="/mypage">
          <div className="menu-item-layout">
            <img className="frame" alt="Frame" src={require('../images/user-icon.svg').default}  />
            <div className="auto-layout">
              <div className="text-wrapper">My Page</div>
            </div>
          </div>
        </Link>
        <Link to="/home">
          <div className="menu-item-layout">
            <img className="frame" alt="Frame" src={require('../images/home-icon.svg').default}  />
            <div className="auto-layout">
              <div className="text-wrapper">Home</div>
            </div>
          </div>
        </Link>
        <Link to="/search">
          <div className="menu-item-layout">
            <img className="frame" alt="Frame" src={require('../images/search-icon.svg').default}  />
            <div className="search-text-wrapper">
              <div className="text-wrapper">Search</div>
            </div>
          </div>
        </Link>
        {/* <Link to="/rooms">
          <div className="menu-item-layout">
            <img className="frame" alt="Frame" src={require('../images/rooms-icon.svg').default}  />
            <div className="auto-layout">
              <div className="text-wrapper">Rooms</div>
            </div>
          </div>
        </Link> */}
        <Link to="/login">
          <div className="menu-item-layout">
            {/* <img className="frame" alt="Frame" src={require('../images/login-icon.svg').default}  /> */}
            <div className="auto-layout">
              <div className="text-wrapper">Login</div>
            </div>
          </div>
        </Link>
        <Link to='/spotifyProfile2'>
          <div className="menu-item-layout">
            {/* <img className="frame" alt="Frame" src={require('../images/login-icon.svg').default}  /> */}
            <div className="auto-layout">
              <div className="text-wrapper">Spotify Profile2</div>
            </div>
          </div>
        </Link>
        <Link to='/spotifyPlayer'>
          <div className="menu-item-layout">
            {/* <img className="frame" alt="Frame" src={require('../images/login-icon.svg').default}  /> */}
            <div className="auto-layout">
              <div className="text-wrapper">Spotify Player</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
