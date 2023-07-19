import React, { useState, useEffect } from 'react';
import '../css/HomeScreen/Post.css';


function Post({ username, imageURL, caption }) {
  const [src, setSrc] = useState(imageURL);

  useEffect(() => {
    if (username === 'Ava Jenkins') {
      setSrc('https://picsum.photos/id/237/500')
    } else if (username === 'Bruce Bowen'){
      setSrc('https://picsum.photos/id/24/500')
    } else if(username === 'Lucas Rodriguez') {
      setSrc('https://picsum.photos/id/37/500')
    }
  }, [])

  

  return (
    <div className="post">
      <div className='post-container'>
        <img src={src} alt={caption} className="post-image" />
        <div className="post-info">
          <div className="post-username">{username}</div>
          <div className="caption">{caption}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;