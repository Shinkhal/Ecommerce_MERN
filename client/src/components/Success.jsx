import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
        }}
        className="text-green-600 text-6xl mb-4"
      >
        <FaCheckCircle />
      </motion.div>

      {/* Animated Text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold mb-2"
      >
        Your order has been placed successfully!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/orders"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Orders
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
