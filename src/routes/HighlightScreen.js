import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Stories from 'react-insta-stories'
import '../css/HomeScreen/HighlightScreen.css'
import HighlightCard from '../components/HighlightCard';
import client from '../client';



function HighlightScreen() {
  // 서버의 URL
  const serverURL = '/highlights';

  // 요청을 보낼 데이터
  const requestData = {
    user: 'user_id_here',
    song_id1: 'song_id1_here',
    song_id2: 'song_id2_here',
    song_id3: 'song_id3_here',
    seconds1_start: 10,
    seconds2_start: 20,
    seconds3_start: 30,
    caption: 'Caption text here',
  };


  client.post(serverURL, requestData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })

  const { initIndex } = useParams();

  console.log(initIndex);

  const [currentIndex, setCurrentIndex] = useState(initIndex);
  const [highlightData, setHighlightData] = useState([[]]);

  // useEffect(() => {
  //   const fetchHighlightData = async () => {
  //     try {
  //       const response = await client.get('/api/highlights'); // Replace '/api/highlights' with your actual API endpoint
  //       setHighlightData(response.data); //create model for highlightdata
  //     } catch (error) {
  //       console.error('Error fetching highlight data:', error);
  //     }
  //   }
  //   fetchHighlightData();
  // }, []);


  const moveToNext = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
    console.log("to next");
  };

  const moveToPrev = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
    console.log("to prev");
  };

  //currentHighlightData = highlightData[currentIndex];

  const currentHighlightData = {
      songIds : [
        '5sdQOyqq2IDhvmx2lHOpwd',
        '6rqhFgbbKwnb9MLmUQDhG6',
        '5sdQOyqq2IDhvmx2lHOpwd',
      ],
      userId : 1,
      userPictureURL : "https://picsum.photos/60/60",
      content : 'lorem ipsum blah'
  };

  const currentHighlightCard = <HighlightCard 
    songIds={currentHighlightData.songIds} 
    userId={currentHighlightData.userId}
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
        />
      </div>
      <div className='moveButton' onClick={moveToNext}>
        <img className="frame" alt="Frame" src={require('../images/arrow-right-icon.svg').default}  />
      </div>
    </div>
  );
}

export default HighlightScreen;