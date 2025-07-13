import React from "react";
import { Link } from "react-router-dom";
import { Star, StarHalf, Star as StarEmpty } from "lucide-react";

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
  }

  if (halfStar) {
    stars.push(<StarHalf key="half-star" className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
  }

  while (stars.length < 5) {
    stars.push(<StarEmpty key={`empty-star-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }

  return stars;
};

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 text-center border border-gray-100"
    >
      <img
        src={product.images[0]?.url}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <p className="text-md font-medium text-gray-800 truncate">{product.name}</p>

      <div className="flex items-center justify-center gap-1 mt-1">
        {renderStars(product.ratings)}
        <span className="ml-1 text-sm text-gray-600">
          ({product.numOfReviews} Reviews)
        </span>
      </div>

      <span className="block mt-2 text-lg font-semibold text-indigo-600">
        ₹{product.price}
      </span>
    </Link>
  );
};

export default ProductCard;
