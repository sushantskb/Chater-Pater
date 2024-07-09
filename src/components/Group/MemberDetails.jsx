/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useRemoveMembers from "../../hooks/useRemoveMembers";

const MemberDetails = ({groupId, members: initialMembers }) => {
  const [members, setMembers] = useState(initialMembers);
  const { removeMembers } = useRemoveMembers()

  useEffect(() => {
    setMembers(initialMembers)
  }, [initialMembers])

  const handleRemove = async (groupId, memberId) => {
    // Function to handle member removal
    const removeMembersId = await removeMembers(groupId ,memberId)
    if(removeMembers){
      setMembers((prevMembers) => prevMembers.filter(member => member.id !== removeMembersId))
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
                {member.fullName}
              </h3>
            </div>
          </div>
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleRemove(groupId, member.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default MemberDetails;
