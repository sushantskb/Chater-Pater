import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetMembers = (groupId) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`api/groups/members/${groupId}`);

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setMembers(data);
      } catch (error) {
        toast.error(error.message, {
          className: "btn btn-error btn-outline",
        });
      } finally {
        setLoading(false);
      }
    };
    if (groupId) {
      getMembers();
    }
  }, [groupId]);

  return { loading, members, setMembers };
};

export default useGetMembers;
