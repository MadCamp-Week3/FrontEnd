import React from 'react';
import { useParams } from 'react-router-dom';
import Stories from 'react-insta-stories'
import '../css/HomeScreen/HighlightScreen.css'
import HighlightCard from '../components/HighlightCard';


function HighlightScreen() {
  // const { id } = useParams(); //highlightId

  // return (
  //   <div>
  //     <h2>Highlight {id}</h2>
  //     {/* Additional content for the highlight page */}
  //   </div>
  // );

  const imgs = [
    'https://picsum.photos/728/432',
    'https://picsum.photos/728/432',
    'https://picsum.photos/728/432',
  ];

  // const highlights = [
  //   {
  //     content: () => {
  //       console.log("loading");
        
  //       return (
  //         <div style={{ background: 'pink', padding: 20 }}>
  //           <img src='https://picsum.photos/728/432'/>
  //           <h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
  //           <h1 style={{ marginTop: 5 }}>A custom title can go here.</h1>
  //         </div>
  //      );
        
  //     } 
  //   },
  // ];

  const data = [
    {
      songIds : [1,2,3],
      userId : 1,
      content : 'first card'
    },
    {
      songIds : [1,2,3],
      userId : 1,
      content : 'second card'
    }
  ]

  const highlights = data.map((item, index) => ({
    content: () => HighlightCard(item.songIds, item.userId, item.content),
    key: index
  }))

  const storyStyle = {
    backgroundColor : 'transparent',
  };

  const progressStyle = {
    height : '10px'
  };

  return (
    <div className='highlightScreen'>
      <div className='highlights'>
        <Stories
          stories={highlights}
          width='100%'
          height='100%'
          storyContainerStyles={storyStyle}
        />
      </div>
    </div>
  );
}

export default HighlightScreen;