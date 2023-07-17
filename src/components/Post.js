import React from 'react';
import '../css/HomeScreen/Post.css';

function Post({ username, imageURL, caption }) {

  return (
    <div className="post">
      <div className='post-container'>
        <img src={imageURL} alt={caption} className="post-image" />
        <div className="post-info">
          <div className="post-username">{username}</div>
          <div className="caption">{caption}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;