import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import toast from "react-hot-toast";


const useGetGroups = () => {
  const [loading, setLoading] = useState(false);
  const { groups, setGroups } = useConversation();

  useEffect(() => {
    const getGroups = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/groups`);
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
