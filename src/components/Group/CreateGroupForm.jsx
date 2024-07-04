/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useCreateGroup from "../../hooks/useCreateGroup";

const CreateGroupForm = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const { createGroup, loading } = useCreateGroup();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
      _id: option.value,
      username: option.text,
    }));

    const newSelectedMembers = selectedOptions.filter(
      (option) => !selectedMembers.some((member) => member._id === option._id)
    );

    setSelectedMembers([...selectedMembers, ...newSelectedMembers]);
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member._id !== memberId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGroup(groupName, selectedMembers.map((member) => member._id));
    setGroupName("");
    setSelectedMembers([]);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded">
      <div className="mb-4">
        <label htmlFor="groupName" className="block text-lg font-bold mb-2">
          Group Name:
        </label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="members" className="block text-lg font-bold mb-2">
          Select Members:
        </label>
        <select
          id="members"
          multiple
          onChange={handleSelectChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          {members
            .filter((member) => !selectedMembers.some((sm) => sm._id === member._id))
            .map((member) => (
              <option key={member._id} value={member._id}>
                {member.username}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {selectedMembers.map((member) => (
          <div
            key={member._id}
            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full"
          >
            {member.username}
            <button
              type="button"
              onClick={() => handleRemoveMember(member._id)}
              className="ml-2 text-lg font-bold"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded bg-blue-500 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Group"}
      </button>
    </form>
  );
};

export default CreateGroupForm;
