import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";

const useSendGroupMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const {socket} = useSocketContext()

  const sendGroupMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`api/groups/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
      // emit the messages to the group via socket
      socket.emit("sendGroupMessages", { groupId: selectedConversation._id, message: data })
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendGroupMessage, loading }
};

export default useSendGroupMessages;
