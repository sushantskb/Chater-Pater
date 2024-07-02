import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }, 100);
    });
  }, [messages]);
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-800 bg-opacity-0 rounded-lg">
      {
        !loading && 
        messages.length > 0 && 
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      }

      {
        !loading && messages.length === 0 && (
          <p className="text-center">Send a message to start the conversation</p>
        )
      }
    </div>
  );
};

export default Messages;
