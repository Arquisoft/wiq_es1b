import React from 'react';

const Background = () => {
  return (
    <div className="video-background">
      <video autoPlay muted loop>
        <source src="/clouds-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Background;