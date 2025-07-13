import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../actions/productAction";
import { getAllOrders } from "../actions/orderAction";
import { getAllUsers } from "../actions/userAction";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  let totalAmount = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) outOfStock += 1;
    });

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial", "Earned"],
    datasets: [
      {
        label: "Total Revenue",
        data: [0, totalAmount],
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "#6366f1",
        tension: 0.4,
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: ["#f87171", "#34d399"],
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-gray-500 text-sm mb-1">Total Amount</h2>
            <p className="text-xl font-semibold text-indigo-600">₹{totalAmount}</p>
          </div>

          <Link to="/admin/products" className="bg-white shadow rounded-lg p-4 text-center hover:bg-indigo-50">
            <h2 className="text-gray-500 text-sm mb-1">Products</h2>
            <p className="text-lg font-medium">{products && products.length}</p>
          </Link>

          <Link to="/admin/orders" className="bg-white shadow rounded-lg p-4 text-center hover:bg-indigo-50">
            <h2 className="text-gray-500 text-sm mb-1">Orders</h2>
            <p className="text-lg font-medium">{orders && orders.length}</p>
          </Link>

          <Link to="/admin/users" className="bg-white shadow rounded-lg p-4 text-center hover:bg-indigo-50">
            <h2 className="text-gray-500 text-sm mb-1">Users</h2>
            <p className="text-lg font-medium">{users && users.length}</p>
          </Link>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-gray-700 font-semibold mb-4">Revenue</h3>
            <Line data={lineState} />
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-gray-700 font-semibold mb-4">Stock Status</h3>
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
