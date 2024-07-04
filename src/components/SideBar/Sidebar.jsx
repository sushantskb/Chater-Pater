import { useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import Search from "./Search";
import Conversations from "./Conversations";
import CreateGroupForm from "../Group/CreateGroupForm";
import LogoutButton from "./LogoutButton";
import Modal from "../Modal/Modal";
import useGetGroups from "../../hooks/useGetGroups";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { authUser } = useAuthContext();
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const { groups } = useGetGroups();
  const { setSelectedConversation } = useConversation();

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCreateGroupForm = () => {
    setShowCreateGroupForm(!showCreateGroupForm);
  };

  const handleSelectedGroup = (group) => {
    setSelectedConversation(group);
  };

  return (
    <div className="flex flex-col w-full sm:w-1/4 bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">ChaterPater</div>
        <img
          src={authUser.profilePic ? authUser.profilePic : "./assets/person.png"}
          alt="Logo"
          className="h-8 w-8"
        />
        <button className="sm:hidden" onClick={handleMenuToggle}>
          <FaBars />
        </button>
      </div>
      <div
        className={`sm:flex ${
          menuOpen ? "flex" : "hidden"
        } flex-col h-full overflow-hidden`}
      >
        <Search searchActive={searchActive} handleSearchClick={handleSearchClick} />
        <button
          onClick={toggleCreateGroupForm}
          className="flex items-center bg-gray-700 p-2 rounded-full mb-4"
        >
          <FaPlus className="mr-2" />
          Create Group
        </button>
        <div className="flex-1 overflow-y-auto">
          <Conversations />
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Groups</h2>
            {groups.length > 0 ? (
              groups.map((group) => (
                <div
                  key={group._id}
                  onClick={() => handleSelectedGroup(group)}
                  className="p-2 cursor-pointer hover:bg-gray-700 rounded"
                >
                  {group.name}
                </div>
              ))
            ) : (
              <p>No groups available</p>
            )}
          </div>
        </div>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>

      <Modal isOpen={showCreateGroupForm} onClose={toggleCreateGroupForm}>
        <CreateGroupForm onClose={toggleCreateGroupForm} />
      </Modal>
    </div>
  );
};

export default Sidebar;
