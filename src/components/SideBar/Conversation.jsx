/* eslint-disable react/prop-types */

const Conversation = () => {
  return (
    <div className="flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
      <img src="https://i.pravatar.cc/300" alt="" className="h-10 w-10 rounded-full mr-2" />
      <span className="text-white">Test User</span>
    </div>
  );
};

export default Conversation;
