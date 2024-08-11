import toast from "react-hot-toast";

import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API
const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/users`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message, {
          className: "btn btn-error btn-outline",
        });
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
