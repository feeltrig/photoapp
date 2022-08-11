import React from 'react';

const PhotoCard = ({ imageObj }) => {
  // INIT
  const { albumId, id, title, url, thumbnailUrl } = imageObj;

  console.log(url);

  return (
    <div className="photoCard">
      <div className="thumbnail">
        <img src={thumbnailUrl} alt="some photo" />
      </div>
      <h4>{title}</h4>
    </div>
  );
};

export default PhotoCard;
