
import toast from "react-hot-toast";

const useDeleteGroup = () => {

  const deleteGroup = async (groupId) => {
    try {
      const res = await fetch(`/api/groups/delete-group/${groupId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
