import React, { useEffect, useState } from 'react';

function SpotifyProfile() {
    const [profile, setProfile] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [playlistItems, setPlaylistItems] = useState(null);
    const token = localStorage.getItem('token'); // You already have the token

    useEffect(() => {
        fetchProfile(token)
        .then(profile => setProfile(profile));
    }, []);

    async function fetchProfile(token) {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    }  
    
    useEffect(() => {
        fetchPlaylists(token)
        .then(playlists => setPlaylists(playlists));
    }, []);

    async function fetchPlaylists(token) {
        const result = await fetch("https://api.spotify.com/v1/me/playlists", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    }

    async function fetchPlaylistItems(token, playlistId) {
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    }

    const handlePlaylistClick = async (playlistId) => {
        const items = await fetchPlaylistItems(token, playlistId);
        setPlaylistItems(items);
    }

    return (
        <div>
            <h1>Display your Spotify profile data</h1>
            {profile && (
                <section id="profile">
                    <h2>Logged in as <span>{profile.display_name}</span></h2>
                    {profile.images && profile.images[0] && (
                        <img src={profile.images[0].url} alt="Profile" width="300" height="300"/>
                    )}
                    <ul>
                        <li>User ID: <span>{profile.id}</span></li>
                        <li>User Country: <span>{profile.country}</span></li>
                        <li>Email: <span>{profile.email ? profile.email : 'Email not available'}</span></li>
                        <li>Spotify URI: <a href={profile.uri}>{profile.uri}</a></li>
                        <li>Link: <a href={profile.href}>{profile.href}</a></li>
                        <li>Profile Image: <span>{profile.images && profile.images[0] ? profile.images[0].url : 'No profile image'}</span></li>
                    </ul>
                </section>
            )}
            <h1>Your Spotify Playlists</h1>
            {playlists && playlists.items.map((playlist, index) => (
                <div key={index} onClick={() => handlePlaylistClick(playlist.id)}>
                    <h1>{playlist.uri}</h1>
                    <h2>{playlist.name}</h2>
                    <p>{playlist.description}</p>
                    <img src={playlist.images[0]?.url} alt={playlist.name} width="200" height="200"/>
                    <a href={playlist.external_urls.spotify}>Open in Spotify</a>
                </div>
            ))}
            {playlistItems && (
                <div>
                    <h1>Playlist Items</h1>
                    {playlistItems.items.map((item, index) => (
                        <div key={index}>
                            <h2>{item.track.name}</h2>
                            <p>{item.track.artists.map(artist => artist.name).join(', ')}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SpotifyProfile;
