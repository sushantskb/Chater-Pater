/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation.js";

const Message = ({ message }) => {
  console.log("message", message);
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "flex-row-reverse" : "flex-row";
  const name = fromMe ? null : selectedConversation?.fullName;
  const profilePic = fromMe ? null : selectedConversation?.profilePic;
  const chatColor = fromMe ? "bg-gradient-to-r from-blue-500 to-purple-400 text-white" : "bg-gradient-to-r from-yellow-500 to-green-400 text-white";

  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (message.shouldShake) {
      setShouldShake(true);
      const timeout = setTimeout(() => {
        setShouldShake(false);
      }, 500); // Adjust the duration as needed
      return () => clearTimeout(timeout);
    }
  }, [message.shouldShake]);

  return (
    <div className={`flex ${chatClassName} mb-4 items-start`}>
      {!fromMe && (
        <div className="chat-image avatar mt-1">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={profilePic ? profilePic : "./assets/person.png"} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      <div className={`max-w-md rounded-lg px-4 py-2 ${chatColor} ${shouldShake ? "shake-animation" : ""}`}>
        {!fromMe && <p className="text-xs mb-1 text-black font-semibold">{name ? name : message.fullName}</p>}
        <p className="text-m font-bold">{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
