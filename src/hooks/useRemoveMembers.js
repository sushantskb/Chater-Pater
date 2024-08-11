import toast from "react-hot-toast";

const API = import.meta.env.VITE_API

const useRemoveMembers = () => {
  const removeMembers = async (groupId, memberId) => {
    try {
      const res = await fetch(
        `${API}/api/groups/remove-member/${groupId}/${memberId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        }
      );
      const data = await res.json();
      if (data.error) {
        toast.error("You are not the admin", {
          className: "btn btn-warning btn-outline",
        });
      } else {
        toast.success(data.message, {
          className: "btn btn-success btn-outline",
        });
      }
      return data
    } catch (e) {
      toast.error(e, {
        className: "btn-error btn-outline",
      });
    }
  };
  return { removeMembers };
};

export default useRemoveMembers;