import { FaSearch } from "react-icons/fa";

/* eslint-disable react/prop-types */
const Search = ({ searchActive, handleSearchClick }) => {
  return (
    <div className="mb-4">
      <button
        onClick={handleSearchClick}
        className="flex items-center bg-gray-700 p-2 rounded-full"
      >
        <FaSearch />
      </button>
      {searchActive && (
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full mt-2 bg-gray-700 text-white placeholder-gray-400"
        />
      )}
    </div>
  );
};

export default Search;