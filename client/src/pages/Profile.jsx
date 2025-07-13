// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Calendar, Mail, User, Package, Lock, Edit3, Shield, Settings } from "lucide-react";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login"); // or "/" based on your flow
    }
  }, [isAuthenticated, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Member since {String(user?.createdAt).substring(0, 10)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="relative inline-block mb-6">
                <img
                  src={user?.avatar?.url || "/Profile.png"}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
              <p className="text-gray-600 mb-6">{user?.email}</p>
              
              <Link
                to="/me/update"
                className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </div>

           
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                <Link
                  to="/me/update"
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    Full Name
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-900 font-medium">{user?.name}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    Email Address
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-900 font-medium">{user?.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    Member Since
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-900 font-medium">{String(user?.createdAt).substring(0, 10)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Shield className="w-4 h-4 mr-2 text-gray-500" />
                    Account Status
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/orders"
                  className="group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-xl p-6 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-500 group-hover:bg-blue-600 p-3 rounded-full transition-colors duration-200">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">My Orders</h4>
                      <p className="text-sm text-gray-600">View order history and track packages</p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/password/update"
                  className="group bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 rounded-xl p-6 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-500 group-hover:bg-purple-600 p-3 rounded-full transition-colors duration-200">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">Change Password</h4>
                      <p className="text-sm text-gray-600">Update your security credentials</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates about your orders</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    Setup
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                      <p className="text-sm text-gray-600">Receive promotional offers</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;