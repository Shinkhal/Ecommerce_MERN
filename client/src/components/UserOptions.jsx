import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { toast } from "react-toastify";
import {
  User,
  LogOut,
  ShoppingCart,
  LayoutDashboard,
  PackageCheck,
} from "lucide-react";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200"
      >
        <img
          src={user?.avatar?.url || "/Profile.png"}
          alt="User"
          className="w-full h-full rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-2 space-y-1">
            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            )}
            <Link
              to="/orders"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
            >
              <PackageCheck className="w-4 h-4 mr-2" />
              Orders
            </Link>
            <Link
              to="/account"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
            <Link
              to="/cart"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({cartItems.length})
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOptions;
