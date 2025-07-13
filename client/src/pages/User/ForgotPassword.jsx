import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import { MdOutlineMail } from "react-icons/md";
import Loader from "../../components/Loader"

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center min-h-[80vh] px-4">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Forgot Password
            </h2>

            <form onSubmit={forgotPasswordSubmit} className="space-y-5">
              <div className="flex items-center border rounded px-3 py-2">
                <MdOutlineMail className="text-gray-500 mr-2 text-lg" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
