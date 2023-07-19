import React, { useState, useEffect, useContext } from 'react';
import '../css/HomeScreen/HighlightCard.css'
import addIcon from '../images/add-icon.svg';
import { FetchTracksByIds, SearchSongs, addSongToPlaylist } from '../functions/spotify.js';
import { TokenContext } from '../App';  // Assume your App component is one level up in the directory

const HighlightCard = ( {songIds, userId, userPictureURL, content} ) => {
  const [songs, setSongs] = useState([]);
  const { token, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT } = useContext(TokenContext);

  console.log(`song ids are`); //
  console.log(songIds); //
  console.log(`tokens are ${token}`); //

  useEffect(() => {
    console.log('fetch start 2');
    async function fetchData(token, songIds) {
      console.log('fetch start'); //
      const tracks = await FetchTracksByIds(token, songIds);
      console.log('fetch complete'); //
      console.log(tracks); //

      const formattedSongs = tracks.map((track) => ({
        id: track.id,
        albumCover: track.album.images[0].url,
        title: track.name,
        artist: track.artists[0].name,
      }));

      setSongs(formattedSongs);
    }
    
    fetchData(token, songIds);
  }, []);
  
  
  //TODO db연결
  
  console.log('songs are');
  console.log(songs);

  function HighlightItem({ id, albumCover, title, artist }) {

    const onClickAdd = async (event) => {
      event.stopPropagation();
      console.log(`pressed id ${id} `)
      console.log(`pressed title ${title} `)

      //addSongToPlaylist(id, 1); //TODO add the songid to the users playlist

      try {
        await addSongToPlaylist(id, '0XXiFNGg1FNXPDhQD07ZSt'); // Replace 'your_playlist_id' with the actual playlist ID
      } catch (error) {
        console.error(`Failed to add song to playlist: ${error.message}`);
      }
    };

    return (
      <div className="highlightItem">
        <img className="album-cover" src={albumCover} alt="Album Cover" />
        <div className="song-details">
          <div className="song-title">{title}</div>
          <div className="song-artist">{artist}</div>
        </div>
        <div className='song-add' onClick={onClickAdd}>
          <img className="add-frame" alt="Frame" src={addIcon}  />
        </div>
      </div>
    );
  }

  function HighlightInfo( {profileURL, profileName, caption} ) {
    return (
      <div className='highlight-info'>
        <img className="profile-picture" src={profileURL} alt="Album Cover" />
        <div className="profile-name">{profileName}</div>
        <div className="highlight-caption">{caption}</div>
      </div>
    );
  }

  //TODO db 연결
  const profileName = "John Doe"; //with userId

  const profileURL= userPictureURL;
  // const profileName = "John Doe"; //with userId 

  return (
    <div className="highlightCard">
      <div className='highlightContainer'>
      {songs && songs.length > 0 && (<>
        <HighlightInfo profileURL={profileURL} profileName={profileName} caption={content}/>
        
          <HighlightItem id={songs[0].id} albumCover={songs[0].albumCover} title={songs[0].title} artist={songs[0].artist} />
          <HighlightItem id={songs[1].id} albumCover={songs[1].albumCover} title={songs[1].title} artist={songs[1].artist} />
         <HighlightItem id={songs[2].id} albumCover={songs[2].albumCover} title={songs[2].title} artist={songs[2].artist} />
        </>)}
      </div>
    </div>
  );
  
}

export default HighlightCard;
