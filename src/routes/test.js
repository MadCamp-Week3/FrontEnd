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

  return (
    <div className='main-content'>
      dfs
    </div>
    );
};

export default Test;