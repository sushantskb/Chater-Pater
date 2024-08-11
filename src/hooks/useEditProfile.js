import { useState } from "react";
import toast from "react-hot-toast";


const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const editProfile = async ({ fullName, username, profilePic, gender }) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/edit-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          gender,
          profilePic,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setLoading(false);
      toast.success("Once logout and then login to see the changes");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return { editProfile, loading, setLoading };
};

export default useEditProfile;
