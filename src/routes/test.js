import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';  // Assume your App component is one level up in the directory



const Test = () => {
  const { token, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT } = useContext(TokenContext);

  const fetchProfile = async (token) => {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
  }

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile(fetchProfile(token));
  }, [])

  console.log(profile);

  return (
    <div className='main-content'>
      <h1>{profile.email}</h1>
      <h1>{profile.id}</h1>
      <h1>{profile.display_name}</h1>
    </div>
    );
};

export default Test;