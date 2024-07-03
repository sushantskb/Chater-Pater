/* eslint-disable react/prop-types */
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation.js";

const Message = ({ message }) => {
  console.log("message", message);
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const chatColor = fromMe ? "bg-gradient-to-r p-2 rounded-lg from-blue-500 to-purple-400 text-white max-w-xs"  : "bg-gradient-to-r p-2 rounded-lg from-yellow-500 to-green-400 text-white max-w-xs"
  return (
    <div className={`flex ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic ? profilePic : "./assets/person.png"} />
        </div>
      </div>
      <div className={`${chatColor}`}>
        {message.message}
      </div>
    </div>
  );
};

export default Message;

// `flex ${isUser ? "justify-end" : "justify-start"}`
// `p-2 rounded-lg ${isUser ? "bg-blue-500 text-white" : "bg-gray-700 text-white"} max-w-xs`
