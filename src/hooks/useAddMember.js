import toast from "react-hot-toast";

const useAddMember = () => {
  const addMembers = async (groupId, memberId) => {
    try {
      const res = await fetch(
        `/api/groups/add-member/${groupId}/${memberId}`,
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
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
      return data;
    } catch (error) {
      toast.error(error.message, {
        className: "btn-error btn-outline",
      });
    }
  };

  return { addMembers };
};

export default useAddMember;
