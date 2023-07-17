import React, { useState } from 'react';
import { Route } from 'react-router-dom';

const MusicPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 검색 실행 로직을 작성하세요.
    // 예를 들어, 검색어를 사용하여 방을 검색하고 결과를 `rooms` 상태로 설정합니다.
    // API 호출이 필요한 경우, 해당 로직을 구현합니다.
    // 검색 결과는 rooms 상태에 저장됩니다.
  };

  const handleCreateRoom = () => {
    // 방 만들기 로직을 작성하세요.
    // 예를 들어, 방 생성 모달을 열거나 페이지로 이동하는 등의 동작이 있을 수 있습니다.
  };

  return (
    <div>
      <h2>음악방</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="방 검색"
        />
        <button type="submit">검색</button>
      </form>

      <button onClick={handleCreateRoom}>방 만들기</button>

      <h3>방 목록</h3>
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      ) : (
        <p>방이 없습니다.</p>
      )}
    </div>
  );
};

const MusicPageRoute = () => {
    return (
      <Route path="/music" element={<MusicPage />} />
    );
  };
  

export default MusicPage;
