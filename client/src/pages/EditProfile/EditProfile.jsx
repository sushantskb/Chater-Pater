import { useState, useEffect } from "react";
import GenderCheckBox from "../Signup/GenderCheckBox";
import useEditProfile from "../../hooks/useEditProfile";
import { useAuthContext } from "../../context/AuthContext";

const EditProfile = () => {
  const { authUser } = useAuthContext();
  const [inputs, setInputs] = useState({
    fullName: authUser.fullName,
    username: authUser.username,
    gender: authUser.gender,
    profilePic: authUser.profilePic,
  });

  const { loading, editProfile, setLoading } = useEditProfile();

  const [profilePicPreview, setProfilePicPreview] = useState(authUser.profilePic);

  useEffect(() => {
    if (inputs.profilePic && typeof inputs.profilePic !== "string") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(inputs.profilePic);
    } else if (typeof inputs.profilePic === "string") {
      setProfilePicPreview(inputs.profilePic);
    } else {
      setProfilePicPreview("");
    }
  }, [inputs.profilePic]);

  const handleCheckbox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setInputs({ ...inputs, profilePic: file });
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return "";
    setLoading(true);
    try {
      const image = new FormData();
      image.append("file", file);
      image.append("upload_preset", "chatter-patter");
      image.append("cloud_name", "dbgght6ld");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbgght6ld/image/upload",
        {
          method: "POST",
          body: image,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Image upload failed");
      }
      setLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to cloudinary: ", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profilePicUrl = inputs.profilePic;
    if (inputs.profilePic && typeof inputs.profilePic !== "string") {
      profilePicUrl = await uploadToCloudinary(inputs.profilePic);
    }

    const updatedInputs = {
      fullName: inputs.fullName,
      username: inputs.username,
      gender: inputs.gender,
      profilePic: profilePicUrl,
    };
    // console.log("updated inputs", updatedInputs);
    await editProfile(updatedInputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      <div className="bg-black bg-opacity-50 p-6 md:p-12 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-white">
          Edit Profile
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
              htmlFor="profilePic"
              className="text-sm font-semibold text-gray-300"
            >
              Profile Pic
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleFileInput}
            />
          </div>
          {profilePicPreview && (
            <div className="flex justify-center mt-4">
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full"
              />
            </div>
          )}
          <GenderCheckBox
            onCheckboxChange={handleCheckbox}
            selectedGender={inputs.gender}
          />
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-md hover:from-blue-700 hover:to-purple-600 transition duration-300"
          >
            {!loading ? (
              "Update"
            ) : (
              <span className="loading loading-ring loading-xs"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
