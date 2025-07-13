import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../actions/productAction";
import { DELETE_REVIEW_RESET } from "../constants/productConstants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Star, Trash2 } from "lucide-react";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId, navigate]);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    } else {
      toast.warning("Please enter a valid 24-character Product ID");
    }
  };

  return (
      <div className="flex">
        <Sidebar />

        <div className="flex-1 px-6 py-8">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-8 space-y-4"
          >
            <h1 className="text-xl font-bold text-center">All Reviews</h1>

            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Product ID"
                className="flex-1 border px-4 py-2 rounded focus:outline-indigo-500"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || productId === ""}
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded disabled:opacity-50"
            >
              Search
            </button>
          </form>

          {reviews && reviews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
                <thead>
                  <tr className="bg-gray-100 text-sm text-left">
                    <th className="px-4 py-2 border-b">Review ID</th>
                    <th className="px-4 py-2 border-b">User</th>
                    <th className="px-4 py-2 border-b">Comment</th>
                    <th className="px-4 py-2 border-b">Rating</th>
                    <th className="px-4 py-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((item) => (
                    <tr key={item._id} className="text-sm">
                      <td className="px-4 py-2 border-b">{item._id}</td>
                      <td className="px-4 py-2 border-b">{item.name}</td>
                      <td className="px-4 py-2 border-b">{item.comment}</td>
                      <td
                        className={`px-4 py-2 border-b font-semibold ${
                          item.rating >= 3 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.rating}
                      </td>
                      <td className="px-4 py-2 border-b">
                        <button
                          onClick={() => deleteReviewHandler(item._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            productId.length === 24 && (
              <h2 className="text-center text-lg font-medium mt-4 text-gray-500">
                No reviews found for this product.
              </h2>
            )
          )}
        </div>
      </div>
  );
};

export default ProductReviews;
