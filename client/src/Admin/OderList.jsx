import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";
import {
  getAllOrders,
  deleteOrder,
  clearErrors,
} from "../actions/orderAction";
import { DELETE_ORDER_RESET } from "../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const {
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order deleted successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch,  error, deleteError, isDeleted]);

  const deleteOrderHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  return (
    <Fragment>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-2xl font-semibold mb-4">All Orders</h1>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Order ID</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Items Qty</th>
                    <th className="px-4 py-2 border">Amount (₹)</th>
                    <th className="px-4 py-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 border">{order._id}</td>
                      <td
                        className={`px-4 py-2 border font-medium ${
                          order.orderStatus === "Delivered"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {order.orderStatus}
                      </td>
                      <td className="px-4 py-2 border">
                        {order.orderItems.length}
                      </td>
                      <td className="px-4 py-2 border">
                        ₹{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <div className="flex justify-center gap-3">
                          <Link
                            to={`/admin/order/${order._id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => deleteOrderHandler(order._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {orders?.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
