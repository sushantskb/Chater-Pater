import MessageInput from "./MessageInput";
import Messages from "./Messages";


const MessageContainer = () => {
  return (
    <div className="flex flex-col h-full w-full sm:w-3/4 bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">Test User</div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
