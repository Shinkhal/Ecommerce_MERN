import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import CartItemCard from "../../components/CartItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      toast.info("No more stock available");
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
    toast.success("Item removed from cart");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10">
          <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Product in Your Cart</h2>
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2 transition"
          >
            View Products
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto p-4">
          <div className="grid grid-cols-3 font-semibold text-gray-700 border-b pb-2 mb-4">
            <p>Product</p>
            <p className="text-center">Quantity</p>
            <p className="text-right">Subtotal</p>
          </div>

          {cartItems.map((item) => (
            <div
              className="grid grid-cols-3 items-center border-b py-4 gap-4"
              key={item.product}
            >
              <CartItemCard item={item} deleteCartItems={deleteCartItems} />

              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-semibold rounded"
                >
                  -
                </button>
                <input
                  type="number"
                  readOnly
                  value={item.quantity}
                  className="w-12 text-center border rounded"
                />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-semibold rounded"
                >
                  +
                </button>
              </div>

              <p className="text-right font-medium text-gray-800">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 flex-col sm:flex-row gap-4">
            <div className="text-lg font-semibold">
              Gross Total:{" "}
              <span className="text-blue-600">
                ₹
                {cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}
              </span>
            </div>
            <button
              onClick={checkoutHandler}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
