import React, { useEffect, useState } from 'react';
import '../css/MyPlaylists.css'
import axios from 'axios';

const IngyuPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
  
    useEffect(() => {
      const fetchPlaylists = async () => {
        const userId = '31v7isepq2h46nhijpyddjys5xsu';  // Replace with the actual user ID
        const token = localStorage.getItem('access_token');  // Get the access token from local storage
  
        try {
          const response = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          const playlistsWithCover = await Promise.all(response.data.items.map(async playlist => {
            const coverResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/images`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
  
            return {
              ...playlist,
              coverImage: coverResponse.data[0] ? coverResponse.data[0].url : null
            };
          }));
  
          setPlaylists(playlistsWithCover);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      };
  
      fetchPlaylists();
    }, []);
  
    return (
      <div>
        <h2>User's Playlists:</h2>
        {playlists.map((playlist, index) => (
          <div key={index}>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            {playlist.coverImage && <img src={playlist.coverImage} alt={playlist.name} />}
          </div>
        ))}
      </div>
    );
  };
  
export default IngyuPlaylist;
