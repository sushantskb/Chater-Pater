import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetGroupMessages = () => {
  const [loading, setLoading] = useState(false);
  const {
    messages: groupMessages,
    setMessages,
    selectedConversation,
  } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/groups/messages/${selectedConversation._id}`
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        if (data && data.length > 0) {
          setMessages(data);
        } else {
          setMessages([]);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id && selectedConversation.name) getMessages();
  }, [selectedConversation?._id, selectedConversation.name, setMessages]);
  return { groupMessages, loading };
};

export default useGetGroupMessages;
