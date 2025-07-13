import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ReviewCard from "../../components/ReviewCard";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);

  const [quantity, setQuantity] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item added to cart");
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setShowReview(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review submitted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Product Container */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Carousel */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full overflow-hidden rounded-lg">
            {product.images?.length > 0 ? (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full object-contain"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-5">
          <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
          <p className="text-sm text-gray-500">Product ID: {product._id}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500">
              {"★".repeat(Math.floor(product.ratings || 0))}
              {"☆".repeat(5 - Math.floor(product.ratings || 0))}
            </div>
            <span className="text-gray-600 text-sm">
              ({product.numOfReviews} Reviews)
            </span>
          </div>

          {/* Price */}
          <h2 className="text-2xl text-indigo-600 font-bold">₹{product.price}</h2>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              -
            </button>
            <input
              type="number"
              readOnly
              value={quantity}
              className="w-12 text-center border border-gray-300 rounded"
            />
            <button
              onClick={increaseQuantity}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            disabled={product.Stock < 1}
            onClick={addToCartHandler}
            className={`w-full py-2 text-white font-medium rounded ${
              product.Stock < 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {product.Stock < 1 ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-1">Description:</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Submit Review Button */}
          <button
            onClick={() => setShowReview(true)}
            className="mt-4 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Review Dialog */}
      {showReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Submit Review</h2>

            {/* Rating Select */}
            <select
              onChange={(e) => setRating(Number(e.target.value))}
              value={rating}
              className="w-full border p-2 mb-4 rounded"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 && "s"}
                </option>
              ))}
            </select>

            {/* Comment Box */}
            <textarea
              rows="4"
              placeholder="Your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReview(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={reviewSubmitHandler}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
