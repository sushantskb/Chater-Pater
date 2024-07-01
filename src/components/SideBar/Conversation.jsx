/* eslint-disable react/prop-types */

const Conversation = () => {
  return (
    <div className="online flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer relative">
      <img
        src="https://i.pravatar.cc/300"
        alt=""
        className="h-10 w-10 rounded-full mr-2"
      />
      <span className="text-white">Test User</span>
      <span className="absolute right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
    </div>
  );
};

export default Conversation;
