import React, { useState, useContext, useEffect } from 'react';
import client from '../client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';  // Assume your App component is one level up in the directory

const LoginScreen = () => {
  const { token, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      'email': email,
      'password':password,
    }

    // Ensure Axios sends cookies received from the server
    axios.defaults.withCredentials = true;

    client.post('login/', loginData)
      .then((response) => {
        console.log(response.data);
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    // Send a request to the logout endpoint
    client.post('logout/')
      .then(() => {
        navigate('/login');  // Redirect to the home page after logout
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Check the login status on component mount
  useEffect(() => {
    client.get('isLoggedIn/')
      .then((response) => {
        if (response.data.isLoggedIn) {
          // If the user is logged in, redirect them to the home page
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  return (
    <div>
      <h1>Display your Spotify profile data</h1>
      <section id="profile">
      <h2>Logged in as <span id="displayName"></span></h2>
      <span id="avatar"></span>
      <ul>
          <li>User ID: <span id="id"></span></li>
          <li>Email: <span id="email"></span></li>
          <li>Spotify URI: <a id="uri" href="#"></a></li>
          <li>Link: <a id="url" href="#"></a></li>
          <li>Profile Image: <span id="imgUrl"></span></li>
      </ul>
      </section>

      <h1>Spotify Login(without auth)</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            name="email"
            type="email"
            placeholder='이메일을 입력하세요'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="password"
            placeholder='비밀번호를 입력하세요'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">로그인</button>
      </form>

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default LoginScreen;
