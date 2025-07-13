import React from "react";
import {
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-12 border-t">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Brand Info */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-indigo-600 text-white text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full">
              S
            </div>
            <span className="text-2xl font-semibold text-gray-900">ShopZen</span>
          </div>
          <p className="text-sm mb-2">High Quality is our first priority</p>
          <p className="text-xs text-gray-500">© 2025 ShopZen. All rights reserved.</p>
        </div>

        {/* App Download */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Get Our App</h4>
          <p className="text-sm mb-4">Download for Android and iOS</p>

          <div className="space-y-3">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-200 transition"
            >
              <div className="flex items-center space-x-3">
                <FaGooglePlay className="text-2xl text-gray-700" />
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </div>
              <HiOutlineArrowUpRight className="text-gray-500" />
            </a>

            <a
              href="https://www.apple.com/in/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-200 transition"
            >
              <div className="flex items-center space-x-3">
                <FaApple className="text-2xl text-gray-700" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </div>
              <HiOutlineArrowUpRight className="text-gray-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 py-4 border-t">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 space-y-2 md:space-y-0">
          <div className="flex space-x-4">
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
            <a href="/support" className="hover:underline">Support</a>
          </div>
          <div>Made with ❤️ for awesome shopping experience</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
