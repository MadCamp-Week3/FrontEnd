import React, { useState } from 'react';
// import client from '../client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the server via HTTP using Axios

    const url = 'http://127.0.0.1:8000/login/';

    const loginData = {
      'email': email,
      'password':password,
    }
    

    axios.post(url, loginData) // 서버의 로그인 엔드포인트에 맞게 URL을 변경해주세요
      .then((response) => {
        // Handle the server response
        console.log(response.data);
        navigate('/mypage');
      })
      .catch((error) => {
        // Handle any error that occurred during the HTTP request
        console.error(error);
      });
  };

  return (
    <div>
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
    </div>
  );
};

export default LoginScreen;
