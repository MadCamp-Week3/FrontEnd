import React, { useState } from 'react';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 미리 정의된 데이터
  const data = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
  ];

  const handleSearch = () => {
    const results = data.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
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
      <div>
        <h2>Results:</h2>
        {searchResults.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;
