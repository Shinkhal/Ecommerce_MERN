import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Search from "../../components/Search";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [search, setSearch] = useState(keyword || "");

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(search, currentPage, price, category, ratings));
  }, [dispatch, search, currentPage, price, category, ratings, error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Embedded Search Component */}
      <div className="mb-6">
        <Search />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <aside className="w-full lg:w-1/4 space-y-6">
            {/* Price Filter */}
            <div>
              <h4 className="font-semibold mb-2">Price Range</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={0}
                  max={25000}
                  value={price[0]}
                  onChange={(e) =>
                    setPrice([Number(e.target.value), price[1]])
                  }
                  className="w-1/2 border rounded px-2 py-1"
                />
                <span>-</span>
                <input
                  type="number"
                  min={0}
                  max={25000}
                  value={price[1]}
                  onChange={(e) =>
                    setPrice([price[0], Number(e.target.value)])
                  }
                  className="w-1/2 border rounded px-2 py-1"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="font-semibold mb-2">Categories</h4>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`cursor-pointer hover:text-indigo-600 ${
                      category === cat ? "font-bold text-indigo-600" : ""
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ratings Filter */}
            <div>
              <h4 className="font-semibold mb-2">Ratings Above</h4>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={ratings}
                onChange={(e) => setRatings(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm mt-1">Above {ratings} stars</p>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="w-full lg:w-3/4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Products;
