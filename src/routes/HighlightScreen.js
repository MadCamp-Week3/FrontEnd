import React from 'react';
import { useParams } from 'react-router-dom';

function HighlightScreen() {
  const { id } = useParams(); //highlightId

  return (
    <div>
      <h2>Highlight {id}</h2>
      {/* Additional content for the highlight page */}
    </div>
  );
}

export default HighlightScreen;