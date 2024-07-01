import { useState } from "react";

const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const members = [
    { _id: "1", username: "user1" },
    { _id: "2", username: "user2" },
    { _id: "3", username: "user3" },
    { _id: "4", username: "user4" },
  ];

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
    setSelectedMembers(selectedMembers.filter((member) => member._id !== memberId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Group Name:", groupName);
    console.log("Selected Members:", selectedMembers);
    setGroupName("");
    setSelectedMembers([]);
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
      <button type="submit" className="w-full p-2 rounded bg-blue-500 hover:bg-blue-600">
        Create Group
      </button>
    </form>
  );
};

export default CreateGroupForm;
