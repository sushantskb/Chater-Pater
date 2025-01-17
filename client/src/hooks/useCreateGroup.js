import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const { groups, setGroups } = useConversation();

  const createGroup = async (groupName, members) => {
    setLoading(true);
    try {
      const res = await fetch("/api/groups/create-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: groupName, members }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGroups([...groups, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { createGroup, loading };
};

export default useCreateGroup;
