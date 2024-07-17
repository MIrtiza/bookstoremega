import React from "react";

interface StarRatingProps {
  ratings: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ ratings, maxRating = 5 }) => {
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span key={i} style={{ color: i <= ratings ? "#ffd700" : "#d3d3d3" }}>
        ★
      </span>
    );
  }
  return <div>{stars}</div>;
};

export default StarRating;
