import React, { useState } from 'react';
import client from '../client';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the server via HTTP using Axios
    const postData = {email, password};

    client.post('/posts', postData)
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
      <h1>Login Page</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginScreen;
