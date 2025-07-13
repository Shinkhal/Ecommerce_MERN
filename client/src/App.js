import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserOptions from "./components/UserOptions";

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

// Admin
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

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {

    // Load user
    dispatch(loadUser());

    // Fetch Stripe API key
    const getStripeApiKey = async () => {
      try {
        const { data } = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error("Error loading Stripe API key:", error);
      }
    };

    getStripeApiKey();

    // Disable right-click
    const disableContextMenu = (e) => e.preventDefault();
    window.addEventListener("contextmenu", disableContextMenu);
    return () => {
      window.removeEventListener("contextmenu", disableContextMenu);
    };
  }, [dispatch]);

  return (
    <Router>
      {/* Toast */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Header */}
      <Header />

      {/* Show user options if logged in */}
      {isAuthenticated && <UserOptions user={user} />}

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
        <Route path="/success" element={<OrderSuccess />} />

        {/* Stripe Payment (only load if key exists) */}
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}

        {/* Protected Routes (User) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        {/* Protected Routes (Admin) */}
        <Route element={<ProtectedRoute isAdmin />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
