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
import useDeleteGroup from "../../hooks/useDeleteGroup";
import { Link } from "react-router-dom";
import MemberDetails from "../Group/MemberDetails";
import useGetMembers from "../../hooks/useGetMembers";

const Sidebar = () => {
  const { authUser } = useAuthContext();
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [showMemberDetails, setMemberDetails] = useState(false);

  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const { groups } = useGetGroups();
  const { setSelectedConversation } = useConversation();
  const { deleteGroup } = useDeleteGroup();

  const { members, creator } = useGetMembers(selectedGroupId);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCreateGroupForm = () => {
    setShowCreateGroupForm(!showCreateGroupForm);
  };

  const toggleMemberDetails = (groupId) => {
    setSelectedGroupId(groupId);
    setMemberDetails(!showMemberDetails);
  };

  const closeMemberDetails = () => {
    setMemberDetails(false);
    setSelectedGroupId(null);
  };

  const handleSelectedGroup = (group) => {
    setSelectedConversation(group);
  };

  const handleDelete = async (groupId) => {
    await deleteGroup(groupId);
    window.location.reload();
  };

  return (
    <div className="flex flex-col w-full sm:w-1/4 bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">ChaterPater</div>
        <Link to="/edit">
          <img
            src={
              authUser.profilePic ? authUser.profilePic : "./assets/person.png"
            }
            alt="Logo"
            className="h-8 w-8 rounded-full mr-2"
          />
        </Link>
        <button className="sm:hidden" onClick={handleMenuToggle}>
          <FaBars />
        </button>
      </div>
      <div
        className={`sm:flex ${
          menuOpen ? "flex" : "hidden"
        } flex-col h-full overflow-hidden`}
      >
        <Search
          searchActive={searchActive}
          handleSearchClick={handleSearchClick}
        />
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
                  className="flex items-center justify-between p-2 rounded"
                >
                  <div
                    onClick={() => handleSelectedGroup(group)}
                    className="cursor-pointer"
                  >
                    {group.name}
                  </div>
                  <button
                    className="btn btn-warning btn-sm btn-outline ml-20"
                    onClick={() => toggleMemberDetails(group._id)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-error btn-sm btn-outline"
                    onClick={() => handleDelete(group._id)}
                  >
                    Delete
                  </button>
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

      <Modal isOpen={showMemberDetails} onClose={closeMemberDetails}>
        <MemberDetails creator={creator} groupId={selectedGroupId} members={members} onClose={closeMemberDetails} />
      </Modal>
    </div>
  );
};

export default Sidebar;
