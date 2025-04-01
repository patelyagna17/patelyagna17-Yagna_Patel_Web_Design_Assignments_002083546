import React from 'react';

const Card = ({ title, content, imageSrc, mapEmbed }) => {
  return (
<div className="card">
      <img src={imageSrc} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        {mapEmbed ? (
        <div dangerouslySetInnerHTML={{ __html: mapEmbed }} />
      ) : (
        <p>{content}</p>
      )}
      </div>
    </div>
  );
};

export default Card;