import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  ShoppingCart,
  Users,
  Star,
  ListOrdered,
} from "lucide-react";


const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-blue-100 text-blue-600 font-semibold"
      : "text-gray-700 hover:bg-gray-100";

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col px-4 py-6">
      

      {/* Navigation */}
      <nav className="space-y-1 text-sm">
        <Link to="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/dashboard")}`}>
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        {/* Products Section */}
        <div className="mt-4">
          <p className="text-gray-500 text-xs uppercase mb-2 px-3">Products</p>
          <Link to="/admin/products" className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/products")}`}>
            <Package size={18} />
            All Products
          </Link>
          <Link to="/admin/product" className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/product")}`}>
            <PackagePlus size={18} />
            Create Product
          </Link>
        </div>

        <Link to="/admin/orders" className={`flex items-center gap-3 px-3 py-2 rounded-md mt-4 ${isActive("/admin/orders")}`}>
          <ShoppingCart size={18} />
          Orders
        </Link>

        <Link to="/admin/users" className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/users")}`}>
          <Users size={18} />
          Users
        </Link>

        <Link to="/admin/reviews" className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/reviews")}`}>
          <Star size={18} />
          Reviews
        </Link>
      </nav>

      <div className="mt-auto text-xs text-center text-gray-400">
        &copy; {new Date().getFullYear()} Ecommerce Admin
      </div>
    </div>
  );
};

export default Sidebar;
