import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2><Link to="/">Music is My Life</Link></h2>
      <img src={""} alt="프로필 사진" />
      <ul>
        <li>
          <Link to="/mypage">마이페이지</Link>
        </li>
        <li>
          <Link to="/feed">피드</Link>
        </li>
        <li>
          <Link to="/search">검색</Link>
        </li>
        <li>
          <Link to="/music">음악방</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
