import React, { useState, useEffect, useContext } from 'react';
import '../css/HomeScreen/HighlightCard.css'
import addIcon from '../images/add-icon.svg';
import { FetchSongsByURI, SearchSongs, addSongToPlaylist } from '../functions/spotify';
import { TokenContext } from '../App';  // Assume your App component is one level up in the directory

const HighlightCard = ( {songURIs = [1, 2, 3], userId, userPictureURL, caption} ) => {

  const { token, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT } = useContext(TokenContext);

  //TODO db연결
  const songData = FetchSongsByURI(token).map((track, index) => ({
    uri: track.uri,
    albumCover: track.album.images[0].url,
    title: track.name,
    artist: track.artists[0].name,
  }));

  const songs = [
    { id: 1, coverURL: 'https://picsum.photos/60/60', title: 'Song 1', artist: 'Artist 1' },
    { id: 2, coverURL: 'https://picsum.photos/60/60', title: 'Song 2', artist: 'Artist 2' },
    { id: 3, coverURL: 'https://picsum.photos/60/60', title: 'Song 3', artist: 'Artist 3' },
  ];

  function HighlightItem({ songURI, coverURL, title, artist }) {

    const onClickAdd = (event) => {
      event.stopPropagation();
      console.log(`pressed ${title} `)

      addSongToPlaylist(songURI, 1); //TODO add the songid to the users playlist
    };

    return (
      <div className="highlightItem">
        <img className="album-cover" src={coverURL} alt="Album Cover" />
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
  const profileURL= "https://picsum.photos/60/60";
  const profileName = "John Doe"; //with userId
  caption = "lorem ipsum"; //= content

  // const profileURL= userPictureURL;
  // const profileName = "John Doe"; //with userId
  // const caption = content;
  

  return (
    <div className="highlightCard">
      <div className='highlightContainer'>
        <HighlightInfo profileURL={profileURL} profileName={profileName} caption={caption}/>
        <HighlightItem songId={songs[0].id} coverURL={songs[0].coverURL} title={songs[0].title} artist={songs[0].artist} />
        <HighlightItem songId={songs[1].id} coverURL={songs[1].coverURL} title={songs[1].title} artist={songs[1].artist} />
        <HighlightItem songId={songs[2].id} coverURL={songs[2].coverURL} title={songs[2].title} artist={songs[2].artist} />
      </div>
    </div>
  );
}

export default HighlightCard;
