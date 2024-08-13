/* eslint-disable react/prop-types */

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        className={`flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer relative ${
          isSelected ? "bg-gray-700" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <img
          src={
            conversation.profilePic
              ? conversation.profilePic
              : "./assets/person.png"
          }
          alt=""
          className="h-10 w-10 rounded-full mr-2"
        />
        <span className="text-white">{conversation.fullName}</span>
        {isOnline ? (
          <span className="absolute right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
        ) : (
          ""
        )}
      </div>
      {!lastIndex ? <div className="divider my-0 py-0 h-1" /> : ""}
    </>
  );
};

export default Conversation;
