import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const addSongToPlaylist = async (token, playlistId, songUri) => {
  try {
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: [songUri],
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Song added to playlist successfully!');
  } catch (error) {
    console.error('Error adding song to playlist:', error);
  }
}

const SearchSongsByKey = async (token, searchKey) => {
  try {
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

const FetchSongsByURI = async (token, URIs) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          ids: URIs.join(','),
        },
      }
    );
    console.log(response.data.tracks);
    return response.data.tracks;
  } catch (error) {
    console.error('Error searching for song:', error);
  }
}

export { addSongToPlaylist, SearchSongsByKey, FetchSongsByURI}