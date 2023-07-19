import React, { useEffect, useState } from 'react';
import '../css/MyPlaylists.css'

const MyPlaylists = () => {
    const [playlists, setPlaylists] = useState(null);
    const [playlistItems, setPlaylistItems] = useState(null);
    const [showPlaylistItems, setShowPlaylistItems] = useState(false);
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

        showPlaylistItems? setShowPlaylistItems(false): setShowPlaylistItems(true)
    }

  return (
    <div className='my-playlist'>
        <div className='playlist-grid'>
        {/* <h1>Your Spotify Playlists</h1> */}
            {playlists && playlists.items.map((playlist, index) => (
                <div className='playlist' 
                  key={index} onClick={() => handlePlaylistClick(playlist.id)}>
                    <div className='playlist-info'>
                        <h2>{playlist.name}</h2>
                        <p>{playlist.description}</p>
                    </div>
                    <img src={playlist.images[0]?.url} alt={playlist.name}className='playlist-img'/>
                    <br/>
                    <div className='button'>
                        <a href={playlist.external_urls.spotify}>
                            <div className='open-in-spotify'>
                                Open in Spotify
                            </div>
                        </a>
                    </div>
                </div>
            ))}
        </div>
        {showPlaylistItems && playlistItems && (
            <div className='playlist-items'>
                <h1>Playlist</h1>
                {playlistItems.items.map((item, index) => (
                    <div key={index} className='playlist-item'>
                        <div className='track-name'>{item.track.name}</div>
                        <div className='artists'>{item.track.artists.map(artist => artist.name).join(', ')}</div>
                    </div>
                ))}
            </div>
        )}
    </div>
    
  );
};

export default MyPlaylists;
