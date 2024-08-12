import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API;
const useGetGroups = () => {
  const [loading, setLoading] = useState(false);
  const { groups, setGroups } = useConversation();

  useEffect(() => {
    const getGroups = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/groups`, {
          credentials: "include",
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
          },
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setGroups(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getGroups();
  }, [setGroups]);
  return { groups, loading };
};

export default useGetGroups;
