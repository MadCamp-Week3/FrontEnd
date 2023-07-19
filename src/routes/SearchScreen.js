import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IngyuPlaylist from '../components/IngyuPlaylist';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFetchButton, setShowFetchButton] = useState(false);
  const [showPlaylists, setShowPlaylists] = useState(false);

  const handleSearch = () => {
    setShowFetchButton(true);
  };  

  const handleFetch = () => {
    setShowPlaylists(true);
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        placeholder="Search..." 
      />
      <button onClick={handleSearch}>Search</button>
      {showFetchButton && <button onClick={handleFetch}>Ingyu</button>}
      {showPlaylists && <IngyuPlaylist />}
    </div>
  );
};

export default SearchScreen;