// import { useState } from "react";

import { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import useSignup from "../../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePic: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckbox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  console.log(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="bg-black bg-opacity-50 p-12 rounded-lg shadow-lg w-1/3">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Sign Up for{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            ChaterPater
          </span>
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="input input-bordered text-white bg-gray-700 placeholder-gray-400"
              placeholder="Enter your fullName"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-300"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              className="input input-bordered text-white bg-gray-700 placeholder-gray-400"
              placeholder="Enter your username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
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
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirm-password"
              className="text-sm font-semibold text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="input input-bordered text-white bg-gray-700 placeholder-gray-400"
              placeholder="Confirm your password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              name="profilePic"
              value={inputs.profilePic}
              onChange={(e) =>
                setInputs({ ...inputs, profilePic: e.target.value })
              }
            />
          </div>

          <GenderCheckBox
            onCheckboxChange={handleCheckbox}
            selectedGender={inputs.gender}
          />

          <p>Already have an account ? <Link to="/login"><span className="text-secondary">Login</span></Link></p>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-md hover:from-blue-700 hover:to-purple-600 transition duration-300"
          >
            {!loading ? (
              "Sign Up"
            ) : (
              <span className="loading loading-ring loading-xs"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
