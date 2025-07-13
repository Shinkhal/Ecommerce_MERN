import React from "react";
import profilePng from "../images/Profile.png";

const ReviewCard = ({ review }) => {
  const getStarIcons = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "½"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg text-center">
      <img
        src={profilePng}
        alt="User"
        className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
      />
      <p className="font-semibold text-gray-800">{review.name}</p>

      <div className="text-yellow-500 text-sm mb-1">
        {getStarIcons(review.rating)}
      </div>

      <p className="text-sm text-gray-600 italic">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
