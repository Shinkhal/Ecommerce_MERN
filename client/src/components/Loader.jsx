import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
