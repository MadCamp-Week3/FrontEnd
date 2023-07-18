import React, { useEffect, useState, useRef } from 'react';

const clientId = "8dfdcd03dc99405ea6a805c7cb932859"; // Replace with your client id
const redirectUri = "http://localhost:3000/spotifyProfile2"; // Replace with your redirect URI


function SpotifyProfile2() {
    const [profile, setProfile] = useState(null); 
    const isMounted = useRef(null);  // add this line

    useEffect(() => {
        isMounted.current = true;

        const params = new URLSearchParams(window.location.search)
        const code = params.get("code");
    
        if (!code) {
            redirectToAuthCodeFlow(clientId);
        } else {
            (async () => {
                const accessToken = await getAccessToken(clientId, code);
                
                if(accessToken) {
                    console.log("accessToken:", accessToken);
                    const profile = await fetchProfile(accessToken);
                    console.log("profile:", profile); // Profile data logs to console
                    // setProfile(profile);  // Update the state with the fetched profile
                if(isMounted.current) {  // check if component is still mounted
                    setProfile(profile);  // Update the state with the fetched profile
                }
                }
                
                
                
                
            })();
        }

        return () => {
            isMounted.current = false;
        }
    }, []);
    
    

    // if (!code) {
    //     redirectToAuthCodeFlow(clientId);
    // } else {
    //     const accessToken =  getAccessToken(clientId, code);
    //     const profile =  fetchProfile(accessToken);
    //     console.log("profile:", profile); // Profile data logs to console
    //     populateUI(profile);
    // }

    async function redirectToAuthCodeFlow(clientId) {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);
    
        localStorage.setItem("verifier", verifier);
    
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", redirectUri);
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
        params.append("redirect_uri", redirectUri);
        params.append("code_verifier", verifier);
    
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        if (!result.ok) {
            console.error(`access_token Error: ${result.status}`);
            return;
        }
    
        const { access_token } = await result.json();
        console.log(access_token);
        return access_token;
    }
    
    async function fetchProfile(token) {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
    
        return await result.json();
    }

    function populateUI(profile) {
        console.log("disp name: ", profile.display_name);
        document.getElementById("displayName").innerText = profile.display_name;
        if (profile.images[0]) {
            const profileImage = new Image(200, 200);
            profileImage.src = profile.images[0].url;
            document.getElementById("avatar").appendChild(profileImage);
            document.getElementById("imgUrl").innerText = profile.images[0].url;
        }
        document.getElementById("id").innerText = profile.id;
        document.getElementById("email").innerText = profile.email;
        document.getElementById("uri").innerText = profile.uri;
        document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
        document.getElementById("url").innerText = profile.href;
        document.getElementById("url").setAttribute("href", profile.href);
    }


    return (
        <div>
          {profile && (
            <div>
              <h1>Display your Spotify profile data</h1>
              <section id="profile">
                <h2>Logged in as {profile.display_name}</h2>
                {profile.images && profile.images.length > 0 && <img src={profile.images[0].url} alt="Profile" />}
                <ul>
                  <li>User ID: {profile.id}</li>
                  <li>Email: {profile.email}</li>
                  <li>Spotify URI: <a href={profile.uri}>{profile.uri}</a></li>
                  <li>Link: <a href={profile.href}>{profile.href}</a></li>
                  <li>Profile Image: {profile.images && profile.images.length > 0 ? profile.images[0].url : '(no profile image)'}</li>

                </ul>
              </section>
            </div>
          )}
        </div>
    );
    
}

export default SpotifyProfile2;
