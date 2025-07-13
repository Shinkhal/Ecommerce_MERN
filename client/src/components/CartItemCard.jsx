import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-contain rounded border"
      />
      <div className="flex flex-col">
        <Link
          to={`/product/${item.product}`}
          className="text-blue-600 hover:underline font-medium"
        >
          {item.name}
        </Link>
        <span className="text-gray-700 text-sm">Price: ₹{item.price}</span>
        <button
          onClick={() => deleteCartItems(item.product)}
          className="text-red-500 hover:underline text-sm mt-1 self-start"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
