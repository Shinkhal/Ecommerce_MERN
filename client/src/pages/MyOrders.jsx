import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../actions/orderAction";
import Loader from "../components/Loader"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ExternalLink, PackageCheck, PackageX } from "lucide-react";


const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>

      {loading ? (
        <Loader />
      ) : (
        <div className="p-4 md:p-8 min-h-[80vh]">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            {user?.name}'s Orders
          </h1>

          {orders && orders.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="text-gray-800 font-medium break-all">
                        {order._id}
                      </p>
                    </div>
                    <Link
                      to={`/order/${order._id}`}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="mt-4 space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-medium">Items:</span>{" "}
                      {order.orderItems.length}
                    </p>
                    <p>
                      <span className="font-medium">Amount:</span> ₹
                      {order.totalPrice}
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="font-medium">Status:</span>
                      {order.orderStatus === "Delivered" ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <PackageCheck className="w-4 h-4" />
                          Delivered
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <PackageX className="w-4 h-4" />
                          {order.orderStatus}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MyOrders;
