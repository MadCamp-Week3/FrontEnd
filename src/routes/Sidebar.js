import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';
import '../css/LinkStyles.css';


function Sidebar() {
  
  return (
    <div className="sidebar">
      <div className="logo-frame-wrapper">
        <img className="logo" alt="Logo auto layout" src={require('../images/logo-icon.svg').default} />
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
        <Link to="/">
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
        <Link to="/rooms">
          <div className="menu-item-layout">
            <img className="frame" alt="Frame" src={require('../images/rooms-icon.svg').default}  />
            <div className="auto-layout">
              <div className="text-wrapper">Rooms</div>
            </div>
          </div>
        </Link>
        <Link to="/login">
          <div className="menu-item-layout">
            {/* <img className="frame" alt="Frame" src={require('../images/login-icon.svg').default}  /> */}
            <div className="auto-layout">
              <div className="text-wrapper">Login</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
