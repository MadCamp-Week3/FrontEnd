import React from 'react';
import '../css/HomeScreen/HighlightSmall.css';
import { useNavigate } from 'react-router-dom';

function HighlightSmall({ username, imageURL, onClick }) {
  const watched = true;

  const highlightClasses = `highlight ${watched ? 'highlight-watched' : ''}`;

  return (
    <div className={highlightClasses} onClick={onClick}>
      <img src={require('../images/user-icon.svg').default} alt={username} className="profile-image" />
      <span className="username">{username}</span>
    </div>
  );
}

export default HighlightSmall;