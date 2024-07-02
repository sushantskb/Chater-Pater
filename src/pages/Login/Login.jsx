import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="bg-black bg-opacity-50 p-12 rounded-lg shadow-lg w-1/3">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Login to{" "}
          <span className="bg-gradient-to-r from-purple-700 to-blue-500  bg-clip-text text-transparent">
            ChaterPater
          </span>
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="input input-bordered text-white bg-gray-700 placeholder-gray-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input input-bordered text-white bg-gray-700 placeholder-gray-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            {"Don't"} have an account ?{" "}
            <Link to="/signup">
              <span className="text-secondary">Signup</span>
            </Link>
          </p>
          <button
            type="submit"
            className="btn bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-md hover:from-blue-700 hover:to-purple-600 transition duration-300"
          >
            { 
              !loading ? "Login" : <span className="loading loading-ring loading-xs"></span>
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
