import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";

import UserOptions from "./UserOptions";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-800">
            Ecommerce
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Right-hand icons */}
        <div className="flex items-center space-x-4">
         

          {/* Cart */}
          <Link to="/cart" className="group relative">
            <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-indigo-600" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User Icon or User Options */}
          {user ? (
            <UserOptions user={user} />
          ) : (
            <Link to="/login">
              <User className="w-5 h-5 text-gray-700 hover:text-indigo-600" />
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1 rounded hover:bg-gray-100"
            aria-label="Toggle mobile menu"
            onClick={toggleMobileMenu}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 shadow">
          <div className="px-4 py-4 space-y-2 text-gray-700 font-medium">
            <Link to="/"        onClick={toggleMobileMenu} className="block">Home</Link>
            <Link to="/products" onClick={toggleMobileMenu} className="block">Products</Link>
            <Link to="/contact"  onClick={toggleMobileMenu} className="block">Contact</Link>
            <Link to="/about"    onClick={toggleMobileMenu} className="block">About</Link>
            {!user && (
              <Link to="/login" onClick={toggleMobileMenu} className="block">
                Login / Register
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
