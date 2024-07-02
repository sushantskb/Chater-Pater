import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";

/* eslint-disable react/prop-types */
const Search = ({ searchActive, handleSearchClick }) => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found");
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleSearchClick}
        className="flex items-center w-10/12 ml-7 p-2 btn btn-primary btn-outline"
      >
        {
          !searchActive ? "Search" : "Close"
        }
      </button>
      {searchActive && (
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 pl-10"
            />
            <button
              type="submit"
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
            >
              <AiOutlineSearch />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Search;
