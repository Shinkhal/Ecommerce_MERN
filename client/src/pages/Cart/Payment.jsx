import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { createOrder, clearErrors } from "../../actions/orderAction";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { FaCreditCard, FaCalendarAlt, FaKey } from "react-icons/fa";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <CheckoutSteps activeStep={2} />

      <div className="flex justify-center items-center min-h-[70vh] p-4">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-lg p-6 rounded w-full max-w-md space-y-6"
        >
          <h2 className="text-xl font-semibold text-center">Card Information</h2>

          <div className="flex items-center border rounded px-3 py-2">
            <FaCreditCard className="text-gray-500 mr-2" />
            <CardNumberElement className="w-full outline-none" />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <CardExpiryElement className="w-full outline-none" />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaKey className="text-gray-500 mr-2" />
            <CardCvcElement className="w-full outline-none" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded cursor-pointer transition"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
