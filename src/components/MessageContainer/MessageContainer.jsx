import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { FiMessageCircle } from "react-icons/fi";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  const getImageSource = (conversation) => {
    if (conversation.name) {
      if (conversation.groupImage) {
        return conversation.groupImage;
      } else {
        return "./assets/person.png";
      }
    } else {
      if (conversation.profilePic) {
        return conversation.profilePic;
      } else {
        return "./assets/person.png";
      }
    }
  };
  return (
    <>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="backgroundImage flex flex-col h-full w-full sm:w-3/4 bg-gray-900 text-white p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={getImageSource(selectedConversation)}
              />
            </div>
            <div className="text-2xl font-bold">
              {selectedConversation.name
                ? selectedConversation.name
                : selectedConversation.fullName}
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            <Messages />
          </div>
          <MessageInput />
        </div>
      )}
    </>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex flex-col h-full w-full sm:w-3/4 bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">No Chat Selected</div>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center space-y-6 p-4 bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">
            <span
              role="img"
              aria-label="chat"
              className="flex justify-center items-center"
            >
              <FiMessageCircle />
            </span>
          </div>
          <h1 className="bg-gradient-to-r text-4xl font-bold from-purple-500 to-blue-400 bg-clip-text text-transparent mb-4">
            Start a Conversation Now!
          </h1>
          <p className="text-lg text-gray-300">
            Select a conversation or start a new one to begin chatting.
          </p>
        </div>
        <div className="mt-8">
          <button className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300">
            Start a New Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
