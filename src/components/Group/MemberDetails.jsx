/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useRemoveMembers from "../../hooks/useRemoveMembers";
import { useAuthContext } from "../../context/AuthContext";

const MemberDetails = ({ groupId, members: initialMembers, creator }) => {
  const [members, setMembers] = useState(initialMembers);
  const { removeMembers } = useRemoveMembers();
  const { authUser } = useAuthContext();

  console.log("Equal", authUser._id === creator);
  console.log("Equal", authUser._id, creator);

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  const handleRemove = async (groupId, memberId) => {
    // Function to handle member removal
    const removeMembersId = await removeMembers(groupId, memberId);
    if (removeMembers) {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== removeMembersId)
      );
    }
  };

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
    </div>
  );
};

export default MemberDetails;
