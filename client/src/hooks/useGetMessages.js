import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API;
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API}/api/messages/${selectedConversation._id}`,
          {
            credentials: "include",
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
            },
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id && selectedConversation?.fullName)
      getMessages();
  }, [selectedConversation?._id, selectedConversation?.fullName, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
