import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Add logic to send the message
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="flex items-center mt-4">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="input input-bordered flex-grow bg-gray-700 text-white placeholder-gray-400"
      />
      <button onClick={handleSendMessage} className="btn btn-primary btn-outline ml-2">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
