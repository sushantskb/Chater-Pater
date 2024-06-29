
const Message = () => {

  return (
    <div className="flex justify-end">
      <div className="bg-gradient-to-r p-2 rounded-lg from-blue-500 to-purple-400 text-white max-w-xs">
        Hello!!👋
      </div>
    </div>
  );
};

export default Message;


// `flex ${isUser ? "justify-end" : "justify-start"}`
// `p-2 rounded-lg ${isUser ? "bg-blue-500 text-white" : "bg-gray-700 text-white"} max-w-xs`