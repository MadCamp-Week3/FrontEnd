import React from 'react';
import '../css/HomeScreen/HighlightCard.css'

const HighlightCard = (songIds = [1, 2, 3], userId, content) => {

  //TODO db연결
  const songData = songIds.map((songId, index) => {
    return songId;
  }); // 스포티파이 노래 id를 통해서 정보 찾기

  const songs = [
    { id: 1, coverURL: 'https://picsum.photos/60/60', title: 'Song 1', artist: 'Artist 1' },
    { id: 2, coverURL: 'https://picsum.photos/60/60', title: 'Song 2', artist: 'Artist 2' },
    { id: 3, coverURL: 'https://picsum.photos/60/60', title: 'Song 3', artist: 'Artist 3' },
  ];

  function HighlightItem({ songId, coverURL, title, artist }) {
    const onClickAdd = () => {
      console.log(`pressed ${title} `)
      //TODO add the songid to the users playlist
    };

    return (
      <div className="highlightItem">
        <img className="album-cover" src={coverURL} alt="Album Cover" />
        <div className="song-details">
          <div className="song-title">{title}</div>
          <div className="song-artist">{artist}</div>
        </div>
        <div className='song-add' onClick={onClickAdd}>
          <img className="add-frame" alt="Frame" src={require('../images/add-icon.svg').default}  />
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
  const profileName = "John Doe";
  const caption = "lorem ipsum";
  

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