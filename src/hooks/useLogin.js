import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API;
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // this is the important part
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged In", {
        className: "btn btn-outline btn-primary",
      });
    } catch (error) {
      toast.error(error.message, {
        className: "btn btn-outline btn-primary",
      });
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;
