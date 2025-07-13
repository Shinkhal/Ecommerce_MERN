import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaMapPin,
  FaHome,
  FaCity,
  FaGlobe,
  FaPhone,
  FaExchangeAlt,
} from "react-icons/fa";
import { saveShippingInfo } from "../../actions/cartAction";
import CheckoutSteps from "../Cart/CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      toast.error("Phone number should be 10 digits long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <CheckoutSteps activeStep={0} />

      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mb-6">
            Shipping Details
          </h2>

          <form onSubmit={shippingSubmit} className="space-y-4">
            {/* Address */}
            <div className="flex items-center border rounded px-3 py-2">
              <FaHome className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {/* City */}
            <div className="flex items-center border rounded px-3 py-2">
              <FaCity className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {/* Pin Code */}
            <div className="flex items-center border rounded px-3 py-2">
              <FaMapPin className="text-gray-500 mr-2" />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {/* Phone Number */}
            <div className="flex items-center border rounded px-3 py-2">
              <FaPhone className="text-gray-500 mr-2" />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {/* Country */}
            <div className="flex items-center border rounded px-3 py-2">
              <FaGlobe className="text-gray-500 mr-2" />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full outline-none bg-transparent"
              >
                <option value="">Select Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            {country && (
              <div className="flex items-center border rounded px-3 py-2">
                <FaExchangeAlt className="text-gray-500 mr-2" />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full outline-none bg-transparent"
                >
                  <option value="">Select State</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!state}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
