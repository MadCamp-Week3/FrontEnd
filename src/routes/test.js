import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';  // Assume your App component is one level up in the directory
import { SearchSongsByKey } from '../functions/spotify';



const Test = () => {
  const { token, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT } = useContext(TokenContext);

  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    console.log('useeffect')
    async function searchSongs(token) {
      const songs = await SearchSongsByKey(token, "a");
      setTracks(songs);
    }

    searchSongs(token);
  }, [])

  console.log('sdf')

  const ids = tracks?.items.map((track) => ({'title': track.name, 'id' : track.id}))

  console.log(ids);

  const createPlaylist = async () => {
    const userId = '31v7isepq2h46nhijpyddjys5xsu'; // Replace with the user ID of the target user
    const playlistName = 'My Awesome Playlist';
  
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: playlistName,
          public: true, // Set to true if you want the playlist to be public
          description: 'some playlist'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Playlist created:', response.data);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const authorize = () => {
    axios.get('https://api.spotify.com/v1/authorize')
  }

  return (
    <div className='main-content'>
      <div onClick={createPlaylist}>create playlist</div>
      <div onClick={authorize}></div>
    </div>
    );
};

export default Test;