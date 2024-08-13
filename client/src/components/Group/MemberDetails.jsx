/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useRemoveMembers from "../../hooks/useRemoveMembers";
import { useAuthContext } from "../../context/AuthContext";
import useAddMember from "../../hooks/useAddMember";

const MemberDetails = ({ groupId, members: initialMembers, creator }) => {
  const [members, setMembers] = useState(initialMembers);
  const { removeMembers } = useRemoveMembers();
  const { addMembers } = useAddMember();
  const { authUser } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membersList, setMemberList] = useState([]);
  const [added, setAdd] = useState(false);

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMemberList(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleRemove = async (groupId, memberId) => {
    const removeMembersId = await removeMembers(groupId, memberId);
    if (removeMembersId) {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== removeMembersId)
      );
    }
  };
  const handleToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  let filteredMember = membersList.filter(
    (member) => !members.some((member2) => member._id === member2.id)
  );

  const handleAddMember = async (groupId, memberId) => {
    const added = addMembers(groupId, memberId);
    if (added) {
      setAdd(true);
    }
  };

  console.log("filtered", filteredMember);
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={member.profilePic}
              alt={`${member.fullName}'s profile`}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-white">
                {authUser._id === member.id ? "You" : member.fullName}{" "}
                {member.id === creator ? (
                  <div className="badge badge-accent badge-outline">Admin</div>
                ) : (
                  ""
                )}
              </h3>
            </div>
          </div>
          {authUser._id === creator && authUser._id !== member.id && (
            <button
              className="btn btn-error btn-sm"
              onClick={() => handleRemove(groupId, member.id)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      {authUser._id === creator && (
        <button className="btn btn-primary btn-sm mt-4" onClick={handleToggle}>
          Add Member
        </button>
      )}
      {isModalOpen && (
        <div className="modal" open={isModalOpen}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Member</h3>
            <ul>
              {filteredMember.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center">
                    <img
                      src={member.profilePic}
                      alt={`${member.fullName}'s profile`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="ml-2">{member.fullName}</div>
                  </div>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAddMember(groupId, member._id)}
                  >
                    {added ? (
                      <button
                        disabled
                        className="btn btn-disabled btn-sm"
                        onClick={() => handleAddMember(groupId, member._id)}
                      >
                        Added
                      </button>
                    ) : (
                      "Add"
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="modal-action">
              <button className="btn" onClick={handleToggle}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetails;
