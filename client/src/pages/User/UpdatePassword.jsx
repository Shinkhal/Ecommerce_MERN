import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUnlockAlt, FaKey } from "react-icons/fa";
import Loader from "../../components/Loader";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center min-h-[80vh] px-4">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Update Password
            </h2>

            <form onSubmit={updatePasswordSubmit} className="space-y-5">
              <div className="flex items-center border rounded px-3 py-2">
                <FaKey className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center border rounded px-3 py-2">
                <FaUnlockAlt className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center border rounded px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
