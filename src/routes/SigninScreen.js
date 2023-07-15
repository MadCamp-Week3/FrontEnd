import React, { useState } from 'react';
import axios from 'axios';
import client from '../client';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const signinData = {
      email: email, 
      password: password, 
      nickname: nickname,
    };

    // Send the form data to the server via HTTP using Axios
    client.post('/users', signinData)
      .then((response) => {
        // Handle the server response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any error that occurred during the HTTP request
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

export default SigninScreen;
