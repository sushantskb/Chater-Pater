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
  const [ isLoading, setIsLoading ] = useState(false);

  const handleCheckbox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleFileInput = (e) => {
    const { name, files } = e.target;
    setInputs({ ...inputs, [name]: files[0] });
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return "";
    setIsLoading(true);
    try {
      const image = new FormData();
      image.append("file", file);
      image.append("upload_preset", "chatter-patter");
      image.append("cloud_name", "dbgght6ld");

      const resposne = await fetch(
        "https://api.cloudinary.com/v1_1/dbgght6ld/image/upload",
        {
          method: "POST",
          body: image,
        }
      );

      const data = await resposne.json();
      // console.log("Cloudinary resposne data", data);

      if (!resposne.ok) {
        throw new Error(data.error.message || "Image upload failed");
      }
      setIsLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profilePicUrl = "";
    if (inputs.profilePic) {
      profilePicUrl = await uploadToCloudinary(inputs.profilePic);
    }
    const newInputs = {
      fullName: inputs.fullName,
      username: inputs.username,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
      gender: inputs.gender,
      profilePic: profilePicUrl ? profilePicUrl : "",
    };
    console.log("new inputs", newInputs);
    await signup(newInputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      <div className="bg-black bg-opacity-50 p-6 md:p-12 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-white">
          Sign Up for{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            ChaterPater
          </span>
        </h2>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
              placeholder="Enter your full name"
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
              type="text"
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
              onChange={handleFileInput}
            />
          </div>
          <GenderCheckBox
            onCheckboxChange={handleCheckbox}
            selectedGender={inputs.gender}
          />
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-secondary">Login</span>
            </Link>
          </p>
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-md hover:from-blue-700 hover:to-purple-600 transition duration-300"
          >
            {loading && isLoading ? (
              <span className="loading loading-ring loading-xs"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
