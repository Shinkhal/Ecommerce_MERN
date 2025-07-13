import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearErrors, updateOrder } from "../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../constants/orderConstants";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "../components/Loader";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, updateError, isUpdated, id]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold mb-4">Process Order</h1>

            {/* Shipping Info */}
            <div className="border p-4 rounded-md bg-white shadow-sm space-y-2">
              <h2 className="text-lg font-semibold">Shipping Info</h2>
              <p><strong>Name:</strong> {order.user?.name}</p>
              <p><strong>Phone:</strong> {order.shippingInfo?.phoneNo}</p>
              <p>
                <strong>Address:</strong>{" "}
                {`${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.state}, ${order.shippingInfo?.pinCode}, ${order.shippingInfo?.country}`}
              </p>
            </div>

            {/* Payment Info */}
            <div className="border p-4 rounded-md bg-white shadow-sm space-y-2">
              <h2 className="text-lg font-semibold">Payment</h2>
              <p className={order.paymentInfo?.status === "succeeded" ? "text-green-600" : "text-red-600"}>
                {order.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
              </p>
              <p><strong>Amount:</strong> ₹{order.totalPrice}</p>
            </div>

            {/* Order Status */}
            <div className="border p-4 rounded-md bg-white shadow-sm space-y-2">
              <h2 className="text-lg font-semibold">Order Status</h2>
              <p className={order.orderStatus === "Delivered" ? "text-green-600" : "text-red-600"}>
                {order.orderStatus}
              </p>
            </div>

            {/* Cart Items */}
            <div className="border p-4 rounded-md bg-white shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Your Cart Items</h2>
              <div className="space-y-4">
                {order.orderItems?.map((item) => (
                  <div key={item.product} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <Link to={`/product/${item.product}`} className="font-medium text-indigo-600 hover:underline">
                      {item.name}
                    </Link>
                    <p className="ml-auto text-sm">
                      {item.quantity} × ₹{item.price} = <strong>₹{item.quantity * item.price}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Update Order Form */}
            {order.orderStatus !== "Delivered" && (
              <form
                onSubmit={updateOrderSubmitHandler}
                className="border p-6 bg-white rounded shadow-md space-y-4 max-w-lg"
              >
                <h2 className="text-lg font-semibold">Update Order Status</h2>

                <select
                  className="w-full px-4 py-2 border rounded"
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Choose Status</option>
                  {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                  {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                </select>

                <button
                  type="submit"
                  disabled={loading || status === ""}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                  Update Status
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessOrder;
