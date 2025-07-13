import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <form
      onSubmit={searchSubmitHandler}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Search a product..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default Search;
