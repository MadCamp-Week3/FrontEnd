import React, { useContext } from 'react';
import '../css/HomeScreen/HomeScreen.css';
import HighlightSmall from '../components/HighlightSmall';
import Post from '../components/Post';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const HomeScreen = () => {
  const user = useContext(UserContext);
  console.log(user);
  const highlights = [
    { id: 1, username: 'John Doe', imageURL: 'profile1.jpg' },
    { id: 2, username: 'user2', imageURL: 'profile2.jpg' },
    { id: 3, username: 'user3', imageURL: 'profile3.jpg' },
  ];

  // 고정데이터로
  const posts = [
    { id: 1, username: 'user1', imageURL: "require('../images/login-icon.svg').default", caption: '앨범 샀다!!1' },
    { id: 2, username: 'user2', imageURL: "https://picsum.photos/60/60", caption: '아이유 예쁘다..' },
    { id: 3, username: 'user3', imageURL: "https://picsum.photos/60/60", caption: 'LP' },
    // Add more posts
  ];

  const navigate = useNavigate();

  const onHighlightClick = (highlightId) => {
    navigate(`/highlight/${highlightId}`);
    console.log('dd');
  }

  return (
      <div className='main-content'>
        <h1>Welcome, {user ? user.user : 'Guest'}!</h1>
        <h1>Home</h1>
        <div className='highlights-section'>
          {highlights.map(highlight => (
            <HighlightSmall
              key={highlight.id}
              username={highlight.username}
              imageURL={highlight.imageURL}
              onClick={() => onHighlightClick(highlight.id)}
            />
          ))}
        </div>
        <div className='posts-section'>
          {posts.map(post => (
            <Post
              key={post.id}
              username={post.username}
              imageURL={post.imageURL}
              caption={post.caption}
            />
          ))}
        </div>
      </div>

    );
};

export default HomeScreen;