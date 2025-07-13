import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getOrderDetails, clearErrors } from "../actions/orderAction";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-[80vh] px-4 py-6 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Order #{order?._id}
          </h1>

          {/* Shipping Info */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Shipping Info
            </h2>
            <div className="bg-white p-4 rounded border space-y-2 text-sm">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {order?.user?.name}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {order?.shippingInfo?.phoneNo}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order?.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </p>
            </div>
          </section>

          {/* Payment Info */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Payment</h2>
            <div className="bg-white p-4 rounded border space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>{" "}
                {order?.paymentInfo?.status === "succeeded" ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Paid
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Not Paid
                  </span>
                )}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ₹
                {order?.totalPrice}
              </p>
            </div>
          </section>

          {/* Order Status */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Order Status
            </h2>
            <div className="bg-white p-4 rounded border text-sm">
              <p
                className={`font-semibold ${
                  order?.orderStatus === "Delivered"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order?.orderStatus}
              </p>
            </div>
          </section>

          {/* Items */}
          <section>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Order Items
            </h2>
            <div className="space-y-4">
              {order?.orderItems?.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center gap-4 bg-white p-3 border rounded shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 text-sm">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      {item.name}
                    </Link>
                    <p>
                      {item.quantity} x ₹{item.price} ={" "}
                      <span className="font-semibold">
                        ₹{item.quantity * item.price}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
