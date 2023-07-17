import React from 'react';
import Stories from 'react-insta-stories';
import Story from 'react-insta-stories';

import Image from '../images/image.jpg';

const StoriesTest = () => {

  const stories = [
    'https://picsum.photos/600/600',
    'https://picsum.photos/600/600',
    'https://picsum.photos/600/600',
    'https://picsum.photos/600/600',
  ];

  return (
    <div>
      <Stories 
        stories = {stories}
        defaultInterval={400}
      />
    </div>  
  );
};

export default StoriesTest;