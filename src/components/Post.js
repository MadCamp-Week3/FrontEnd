import React from 'react';
import '../css/HomeScreen/Post.css';

function Post({ username, imageURL, caption }) {

  return (
    <div className="post">
      <img src={imageURL} alt={caption} className="post-image" />
      <div className="post-info">
        <span className="username">{username}</span>
        <span className="caption">{caption}</span>
      </div>
    </div>
  );
}

export default Post;