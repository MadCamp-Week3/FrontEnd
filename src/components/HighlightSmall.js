import React from 'react';
import '../css/HomeScreen/HighlightSmall.css';
import { useNavigate } from 'react-router-dom';

function HighlightSmall({ username, imageURL, onClick }) {
  const watched = true;

  const highlightClasses = `highlight ${watched ? 'highlight-watched' : ''}`;

  return (
    <div className={highlightClasses} onClick={onClick}>
      <img src="https://picsum.photos/60/60" alt={username} className="profile-image" />
      <div className="username">{username}</div>
    </div>
  );
}

export default HighlightSmall;