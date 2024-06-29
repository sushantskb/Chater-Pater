/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import Search from "./Search";

const Sidebar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col h-full w-full sm:w-1/4 bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gradient-to-r from-red-700 to-blue-500 bg-clip-text text-transparent text-2xl font-bold">ChaterPater</div>
        <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8" />
        <button className="sm:hidden" onClick={handleMenuToggle}>
          <FaBars />
        </button>
      </div>
      <div className={`sm:flex ${menuOpen ? "flex" : "hidden"} flex-col flex-1`}>
        <Search searchActive={searchActive} handleSearchClick={handleSearchClick} />
        <Conversations />
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
