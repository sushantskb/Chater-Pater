import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  return (
    <button className="flex items-center justify-center w-full p-2 bg-red-600 rounded-full mt-4">
      <FaSignOutAlt className="mr-2" />
      Logout
    </button>
  );
};

export default LogoutButton;
