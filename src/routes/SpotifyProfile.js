import React, { useEffect, useState } from 'react';

function SpotifyProfile() {
  const [profile, setProfile] = useState(null);
  const clientId = "8dfdcd03dc99405ea6a805c7cb932859"; // Replace with your client id

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      getAccessToken(clientId, code)
        .then(accessToken => fetchProfile(accessToken))
        .then(profile => setProfile(profile));
    }
  }, []);

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/spotifyProfile");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/spotifyProfile");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
        });
    console.log(result)

    if (!result.ok) {
        const errorResponse = await result.json();
        console.log(errorResponse);
        throw new Error("Failed to get access token");
        }

    const { access_token } = await result.json();
    return access_token;
    }

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}


return (
    <div>
      <h1>Display your Spotify profile data</h1>
      {profile && (
        <section id="profile">
          <h2>Logged in as <span>{profile.display_name}</span></h2>
          <span>{profile.images && profile.images[0] ? profile.images[0].url : 'No profile image'}</span>
          <ul>
            <li>User ID: <span>{profile.id}</span></li>
            <li>Email: <span>{profile.email}</span></li>
            <li>Spotify URI: <a href={profile.uri}>{profile.uri}</a></li>
            <li>Link: <a href={profile.href}>{profile.href}</a></li>
            <li>Profile Image: <span>{profile.images && profile.images[0] ? profile.images[0].url : 'No profile image'}</span></li>
          </ul>
        </section>
      )}
    </div>
  );
  
}

export default SpotifyProfile;
