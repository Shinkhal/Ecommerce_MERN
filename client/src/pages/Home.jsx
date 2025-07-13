import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "../components/ProductCard";
import { clearErrors, getProduct } from "../actions/productAction"
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          {/* Hero Banner */}
          <div className="w-full h-[60vh] bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex flex-col justify-center items-center text-center px-4">
            <p className="text-lg font-medium">Welcome to Ecommerce</p>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-6">FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full hover:bg-gray-100 transition-all">
                Scroll <CgMouse className="animate-bounce" />
              </button>
            </a>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mt-10 mb-6">
            Featured Products
          </h2>

          {/* Product Grid */}
          <div
            id="container"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8 pb-12"
          >
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
