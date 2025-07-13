import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../Cart/CheckoutSteps";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = +(subtotal * 0.18).toFixed(2);
  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <CheckoutSteps activeStep={1} />

      <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
        {/* Shipping + Cart Items */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="bg-white shadow p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Shipping Info</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {shippingInfo.phoneNo}
              </p>
              <p>
                <span className="font-medium">Address:</span> {address}
              </p>
            </div>
          </div>

          <div className="bg-white shadow p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Your Cart Items</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover border rounded"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.name}
                    </Link>
                    <div className="text-sm text-gray-700">
                      {item.quantity} × ₹{item.price} ={" "}
                      <span className="font-semibold">₹{item.quantity * item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div className="flex justify-between">
                <p>GST (18%):</p>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <p>Total:</p>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={proceedToPayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white mt-5 py-2 rounded transition"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
