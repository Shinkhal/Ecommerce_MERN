import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignUp from "./pages/Login";
import Profile from "./pages/User/Profile"
import UpdateProfile from "./pages/User/UpdateProfile";
import MyOrders from "./pages/User/MyOrders";
import ForgotPassword from "./pages/User/ForgotPassword";
import OrderDetails from "./pages/OrderDetails";
import Products from "./pages/Product/Products"
import ProductDetails from "./pages/Product/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Cart/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder";
import Payment from "./pages/Cart/Payment";
import OrderSuccess from "./components/Success";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
    <Router>
      {/* Toast Notifications */}
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

      {/* Global Header */}
      <Header />

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/process/payment" element={<Payment />} />
        <Route path="/success" element={<OrderSuccess />} />
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/products" element={<Products />} /> */}
      </Routes>

      {/* Global Footer */}
      <Footer />
    </Router>
  );
};

export default App;
