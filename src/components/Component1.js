import React, { useEffect, useState } from 'react';

const Component1 = () => {
    const [playlists, setPlaylists] = useState(null);
    const [playlistItems, setPlaylistItems] = useState(null);
    const token = localStorage.getItem('access_token'); // You already have the token


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
      {/* <h1>Your Spotify Playlists</h1> */}
            {playlists && playlists.items.map((playlist, index) => (
                <div key={index} onClick={() => handlePlaylistClick(playlist.id)}>
                    {/* <h1>{playlist.uri}</h1> */}
                    <h2>{playlist.name}</h2>
                    <p>{playlist.description}</p>
                    <img src={playlist.images[0]?.url} alt={playlist.name} width="200" height="200"/>
                    <br/>
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
};

export default Component1;
