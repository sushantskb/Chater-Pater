import toast from "react-hot-toast";

const useRemoveMembers = () => {
  const removeMembers = async (groupId, memberId) => {
    try {
      const res = await fetch(
        `api/groups/remove-member/${groupId}/${memberId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      toast.success(data.message, {
        className: "btn btn-success btn-outline",
      });
    } catch (e) {
      toast.error(e.message, {
        className: "btn-error btn-outline",
      });
    }
  };
  return { removeMembers }
};

export default useRemoveMembers;
