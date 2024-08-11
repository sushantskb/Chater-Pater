import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetMembers = (groupId) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [creator, setCreator] = useState("");

  useEffect(() => {
    const getMembers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/groups/members/${groupId}`);

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setCreator(data.creator);
        setMembers(data.members);
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

  return { loading, members, setMembers, creator };
};

export default useGetMembers;
