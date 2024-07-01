import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  return (
    <button className="flex items-center justify-center w-full p-2 btn btn-error btn-outline 0 rounded-full mt-20">
      <FaSignOutAlt className="mr-2" />
      Logout
    </button>
  );
};

export default LogoutButton;
