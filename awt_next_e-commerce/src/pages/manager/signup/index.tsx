import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/layout";

const Signup = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    managerimage: null,
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({}); // New state for validation errors

  const {
    name,
    email,
    password,
    managerimage,
  } = formdata;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.type === "file" &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      // Use e.target.files to get the selected file
      setFormdata({ ...formdata, [e.target.name]: e.target.files[0] });
    } else {
      // For other input types (text, radio, etc.), handle as usual
      setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
        password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters and contain 2 letters (1 uppercase and 1 lowercase), 2 numbers, and 2 symbols";
    }

    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append(
        "managerimage",
        formdata.managerimage ||
          "https://www.svgrepo.com/download/192244/man-user.svg"
      );

      const res = await axios.post(
        "http://localhost:3000/manager/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        console.log("Success:", res.data);
        router.push("/manager/signin");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      if ((error as any).isAxiosError && (error as any).response) {
        setError(`Error: ${(error as any).response.data.message}`);
      } else {
        console.error("Error:", (error as any).message);
        setError("An error occurred during signup.");
      }
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <form method="POST" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center">Signup page</h1>
          {/* Name */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Name
            </label>
            <input
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { name?: string }).name
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
            {(validationErrors as { name?: string }).name && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { name?: string }).name}
              </p>
            )}
          </div>
          
          {/* Email */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Email
            </label>
            <input
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { email?: string }).email
                  ? "border-red-500"
                  : ""
              }`}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
            {(validationErrors as { email?: string }).email && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { email?: string }).email}
              </p>
            )}
          </div>
         
          
          {/* Password */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Password
            </label>
            <input
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { password?: string }).password
                  ? "border-red-500"
                  : ""
              }`}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
            {(validationErrors as { password?: string }).password && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { password?: string }).password}
              </p>
            )}
          </div>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          {/* Image */}
          <div className="mt-8 max-w-md mx-auto">
            <label
              className="block mb-2 text-sm font-medium text-black "
              htmlFor="managerimage"
            >
              Profile Picture
            </label>
            <div className="relative border border-gray-300 rounded-lg cursor-pointer bg-gray-50 overflow-hidden">
              <input
                className="sr-only"
                aria-describedby="file_input_help"
                id="managerimage"
                name="managerimage"
                onChange={onChange}
                type="file"
              />
              <label
                htmlFor="managerimage"
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                <FontAwesomeIcon icon={faUpload} className="text-gray-500" />
                <span className="ml-2 text-sm text-gray-500">Upload Image</span>
              </label>
            </div>
            <p className="mt-1 text-sm text-black" id="file_input_help">
              SVG, PNG, JPG, or GIF.
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-10 max-w-md mx-auto">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide font-bold text-green-800 hover:text-white border border-green-700 bg-emerald-200 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;