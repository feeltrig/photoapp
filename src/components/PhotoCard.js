import React from 'react';

const PhotoCard = ({ imageObj }) => {
  // INIT
  const { albumId, id, title, url, thumbnailUrl } = imageObj;

  return (
    <div className="photoCard">
      <div className="thumbnail"></div>
      <h3>{title}</h3>
      <p>albumId: {albumId}</p>
    </div>
  );
};

export default PhotoCard;
