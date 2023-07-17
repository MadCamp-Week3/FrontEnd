import React, { useState } from 'react';
import axios from 'axios';
import client from '../client';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 요청을 보낼 URL
    const url = 'http://127.0.0.1:8000/signup/'; // 실제 서버의 엔드포인트로 변경해야 함

    // POST 요청에 포함할 데이터
    const signinData = {
      'email': email, 
      'password': password, 
      'nickname': nickname,
    };
    const config = {"Content-Type": 'application/json'};
    console.log(email);
    console.log(password);
    console.log(nickname);
    console.log(signinData)
    // POST 요청 보내기
    axios.post(url, signinData, config)
      .then((response) => {
        // 요청에 대한 성공 응답 처리
        console.log(response.data);
      })
      .catch((error) => {
        // 요청에 대한 에러 처리
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Signin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Nickname:
          <input
            type="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupScreen;
