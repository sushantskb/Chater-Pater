import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Search from "./Search";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

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
    <div className="flex flex-col h-screen bg-gray-800 text-white p-4 w-full sm:w-1/4">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gradient-to-r from-purple-700 to-blue-600 text-2xl font-bold bg-clip-text text-transparent">ChaterPater</div>
        <img
          src="https://e7.pngegg.com/pngimages/777/788/png-clipart-logo-cpanel-brand-graphics-computer-icons-cp-logo-emblem-text.png"
          alt="Logo"
          className="h-8 w-8"
          style={{mixBlendMode: "multiply", backgroundColor: "purple"}}
        />
        <button className="sm:hidden" onClick={handleMenuToggle}>
          <FaBars />
        </button>
      </div>
      <div className={`sm:flex ${menuOpen ? "flex" : "hidden"} flex-col`}>
        <Search
          searchActive={searchActive}
          handleSearchClick={handleSearchClick}
        />
        <Conversations />
      </div>
        <LogoutButton />
    </div>
  );
};

export default Sidebar;
