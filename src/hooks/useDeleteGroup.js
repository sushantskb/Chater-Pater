import toast from "react-hot-toast";

const API = import.meta.env.VITE_API;
const useDeleteGroup = () => {
  const deleteGroup = async (groupId) => {
    try {
      const res = await fetch(`${API}/api/groups/delete-group/${groupId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
        },
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message, {
        className: "btn btn-error btn-outline",
      });
    } catch (error) {
      toast.error(error.message, {
        className: "btn-error btn-outline",
      });
    }
  };
  return { deleteGroup };
};

export default useDeleteGroup;
