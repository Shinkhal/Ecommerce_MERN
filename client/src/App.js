import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import LoginSignUp from "./pages/Login";
import Profile from "./pages/User/Profile";
import UpdateProfile from "./pages/User/UpdateProfile";
import MyOrders from "./pages/User/MyOrders";
import ForgotPassword from "./pages/User/ForgotPassword";
import UpdatePassword from "./pages/User/UpdatePassword";
import OrderDetails from "./pages/OrderDetails";
import Products from "./pages/Product/Products";
import ProductDetails from "./pages/Product/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Cart/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder";
import Payment from "./pages/Cart/Payment";
import OrderSuccess from "./components/Success";
import NotFound from "./pages/NotFound";

// Admin Dashboard
import AdminDashboard from "./Admin/Dashboard";
import NewProduct from "./Admin/NewProduct";
import OrderList from "./Admin/OderList";
import UsersList from "./Admin/UserList";
import ProductList from "./Admin/ProductList";
import UpdateProduct from "./Admin/UpdateProduct";
import ProcessOrder from "./Admin/ProcessOrder";
import ProductReviews from "./Admin/Reviews";

// Protected Route
import ProtectedRoute from "./pages/Protected";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      {/* Global Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Header */}
      <Header />

      {/* Main Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/process/payment" element={<Payment />} />
        <Route path="/success" element={<OrderSuccess />} />

        {/* 🔐 Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        {/* 🔐 Example Admin Protected Routes (Uncomment & add components as needed) */}
        <Route element={<ProtectedRoute isAdmin />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
          {/* Add more admin routes here */}
        </Route>

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
