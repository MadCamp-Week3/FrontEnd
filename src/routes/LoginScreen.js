import React, { useState, useContext, useEffect } from 'react';
import client from '../client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';  // Assume your App component is one level up in the directory
import { UserContext } from '../App';

const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        setUser(response.data);
        navigate('/login');
        console.log("login success")
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    // Send a request to the logout endpoint
    client.post('logout/')
      .then((response) => {
        navigate('/login');  // Redirect to the home page after logout
        console.log(response)
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Check the login status on component mount
  useEffect(() => {
    console.log(user);
    client.get('isLoggedIn/')
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        console.log(response)
        if (response.data.isLoggedIn) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  return (
    <div>
      {/* <h1>Display your Spotify profile data</h1>
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
      </section> */}

      {/* <h1>Spotify Login</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )} */}

      {user ? (
        <div>
          
        <h1>Spotify에 로그인하여 기능을 이용하세요</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        <h1>로그아웃</h1>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <h1>로그인 페이지</h1>
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
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
