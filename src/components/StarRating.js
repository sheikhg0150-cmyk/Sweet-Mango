import React from 'react';

const StarRating = ({ rating, onRatingChange, size = 20 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => onRatingChange && onRatingChange(i)}
        style={{
          cursor: onRatingChange ? 'pointer' : 'default',
          fontSize: size,
          color: i <= rating ? '#ffc107' : '#e4e5e9',
          marginRight: '2px'
        }}
      >
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

export default StarRating;