import { FaSignOutAlt } from "react-icons/fa";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <button className="flex items-center justify-center w-full p-2 btn btn-error btn-outline 0 rounded-full mt-20" onClick={logout}>
      {!loading ? (
        <FaSignOutAlt className="mr-2" />
      ) : (
        <span className="loading loading-dots loading-xs"></span>
      )}
      {!loading ? "Logout" : ""}{" "}
    </button>
  );
};

export default LogoutButton;
