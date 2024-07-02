import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onClick={handleSendMessage}>
      <div className="flex items-center mt-4">
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered flex-grow bg-gray-700 text-white placeholder-gray-400"
        />
        <button type="submit" className="btn btn-primary btn-outline ml-2">
          {loading ? (
            <span className="loading loading-dots loading-xs btn-primary"></span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
