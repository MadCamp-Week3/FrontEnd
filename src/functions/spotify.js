import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

async function addSongToPlaylist(songId, playlistId) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris: [`spotify:track:${songId}`]
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to add song to playlist: ${response.statusText}`);
  }
}

const SearchSongsByKey = async (token, searchKey) => {
  try {
    console.log('search songs by key start')

    const response = await axios.get(
      "https://api.spotify.com/v1/search", 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "track",
        },
      }
    );
    console.log(response.data.tracks);
    return response.data.tracks;
  } catch (error) {
    console.error('Error searching for song:', error);
  }
}

const FetchTracksByIds = async (token, Ids) => {
  console.log(`ids are ${Ids}`);
  console.log('fetch start')

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        params: {
          ids: Ids.join(','),
        },
      }
    );
    console.log('fetch complete');
    console.log(`fetch tracks returnes ${response.data.tracks}`);
    return response.data.tracks;
  } catch (error) {
    console.log('fetch tracks failed')
    console.error('Error searching for song:', error);
  }
}

export { addSongToPlaylist, SearchSongsByKey, FetchTracksByIds };