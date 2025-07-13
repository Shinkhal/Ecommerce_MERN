import React from "react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </h1>

      <p className="text-gray-600 mb-6">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
