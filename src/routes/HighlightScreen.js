import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Stories from 'react-insta-stories'
import '../css/HomeScreen/HighlightScreen.css'
import HighlightCard from '../components/HighlightCard';
import client from '../client';


function HighlightScreen() {
  const { initIndex } = useParams();

  console.log(initIndex);

  const [currentIndex, setCurrentIndex] = useState(initIndex);
  const [highlightData, setHighlightData] = useState([[]]);

  useEffect(() => {
    const fetchHighlightData = async () => {
      try {
        const response = await client.get('/api/highlights'); // Replace '/api/highlights' with your actual API endpoint
        setHighlightData(response.data); //create model for highlightdata
      } catch (error) {
        console.error('Error fetching highlight data:', error);
      }
    }
    fetchHighlightData();
  }, []);


  const moveToNext = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
    console.log("to next");
  };

  const moveToPrev = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
    console.log("to prev");
  };

  //currentHighlightData = highlightData[currentIndex];

  const currentHighlightData = [
    {
      songIds : [1,2,3],
      userId : 1,
      content : 'first card'
    },
    {
      songIds : [1,2,3],
      userId : 1,
      content : 'second card'
    },
    {
      songIds : [1,2,3],
      userId : 1,
      content : 'second card'
    }
  ]

  const currentHighlights = currentHighlightData.map((item, index) => ({
    content: () => HighlightCard(item.songIds, item.userId, item.content),
    key: index
  }));

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