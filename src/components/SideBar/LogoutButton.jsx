import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  return (
    <button className="bg-gradient-to-r flex items-center justify-center from-red-600 to-blue-500  p-2 rounded-full mt-auto">
      <FaSignOutAlt />
    </button>
  );
};

export default LogoutButton;
