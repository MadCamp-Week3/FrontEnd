import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';
import Stories from 'react-insta-stories'
import '../css/HomeScreen/HighlightScreen.css'
import HighlightCard from '../components/HighlightCard';
import client from '../client';
import { UserContext } from '../App';

function HighlightScreen() {
  const { highlightId } = useParams();

  console.log('highlightId', highlightId)

  const initId = parseInt(highlightId);

  console.log('initIndex: ',initId);

  const initHighlightData = [
    {
      songIds: ['5sdQOyqq2IDhvmx2lHOpwd', '6rqhFgbbKwnb9MLmUQDhG6', '5sdQOyqq2IDhvmx2lHOpwd'],
      userName: 'John Doe',
      userPictureURL: "https://picsum.photos/60/60",
      content: 'lorem ipsum blah'
    },
    {
      songIds: ['2gQPv5jvVPqU2a9HhMNO1v', '0KKkJNfGyhkQ5aFogxQAPU', '28a0aMV1OKoyNiCJuNsWrY'],
      userName: "Emily Thompson",
      userPictureURL: "https://picsum.photos/60/60",
      content: 'dolor sit amet'
    },
    {
      songIds: ['6nICBdDevG4NZysIqDFPEa', '5IAESfJjmOYu7cHyX557kz', '6I9VzXrHxO9rA9A5euc8Ak'],
      userName: "Jack Jones",
      userPictureURL: "https://picsum.photos/60/60",
      content: 'consectetur adipiscing elit'
    },
    {
      songIds: ['5VuH5mBWdaZi5oNzrFhigj', '24jrwTJSlYOCguuLa4j28A', '3dYD57lRAUcMHufyqn9GcI'],
      userName: "Leone Armand",
      userPictureURL: "https://picsum.photos/60/60",
      content: 'sed do eiusmod tempor'
    },
    {
      songIds: ['2Hh3ETdQKrmSI3QS0hme7g', '6CTWathupIiDs7U4InHnDA', '5wG3HvLhF6Y5KTGlK0IW3J'],
      userName: "Billy Stuart",
      userPictureURL: "https://picsum.photos/60/60",
      content: 'incididunt ut labore et dolore magna aliqua'
    },
  ];

  const [currentId, setCurrentId] = useState(initId);
  const [highlightData, setHighlightData] = useState(initHighlightData);



  const moveToNext = () => {
    setCurrentId(prevId => prevId + 1);
    console.log("to next");
  };

  const moveToPrev = () => {
    setCurrentId(prevId => prevId - 1);
    console.log("to prev");

    // // eslint-disable-next-line
    // const navigate = useNavigate();
    // navigate(`/highlight/${currentId-1}`); // 다른 페이지로 어케 이동
  };

  console.log("current id",currentId);
  console.log("Highlightdata", highlightData);
  
  const currentHighlightData = highlightData[currentId];

  console.log("currentHighlightdata", currentHighlightData);

  const currentHighlightCard = <HighlightCard 
    songIds={currentHighlightData.songIds} 
    userName={currentHighlightData.userName}
    userPictureURL={currentHighlightData.userPictureURL} 
    content={currentHighlightData.content} />

  const currentHighlights = [{
      content: () => currentHighlightCard,
      key: 0
    }, {
      content: () => currentHighlightCard,
      key: 1
    }, {
      content: () => currentHighlightCard,
      key: 2
    }
  ];

  console.log('ln 98');

  const storyStyle = {
    backgroundColor : 'transparent',
  };

  return (
    <div className='highlightScreen'>

        <div className='moveButton' onClick={moveToPrev}>
          <img className="frame" alt="Frame" src={require('../images/arrow-left-icon.svg').default}  />
        </div>
        <div className='highlights'>
          <Stories
            stories={currentHighlights}
            width='100%'
            height='100%'
            storyContainerStyles={storyStyle}
            preventDefault={true}
            keyboardNavigation={true}
            defaultInterval={2000}
            onAllStoriesEnd={() => {
              setTimeout(() => {
                moveToNext();
              }, 4000)
            }}
            preloadCount={3}
          />
        </div>
        <div className='moveButton' onClick={moveToNext}>
          <img className="frame" alt="Frame" src={require('../images/arrow-right-icon.svg').default}  />
        </div>

    </div>
  );
}

export default HighlightScreen;