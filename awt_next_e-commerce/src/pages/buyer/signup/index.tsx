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
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    password: "",
    buyerImage: null,
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({}); // New state for validation errors

  const {
    firstname,
    lastname,
    email,
    phone,
    gender,
    dob,
    address,
    password,
    buyerImage,
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

    if (!firstname.trim()) {
      errors.firstname = "First Name is required";
    }

    if (!lastname.trim()) {
      errors.lastname = "Last Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!phone.trim()) {
      errors.phone = "Phone Number is required";
    }

    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (!dob) {
      errors.dob = "Date of Birth is required";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else {
      // Check if the password doesn't meet the criteria
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
          password
        )
      ) {
        errors.password =
          "Password must be at least 8 characters and contain 2 letters (1 uppercase and 1 lowercase), 2 numbers, and 2 symbols";
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    try {
      // Use FormData to handle file uploads
      const formData = new FormData();
      formData.append("BuyerFirstName", firstname);
      formData.append("BuyerLastName", lastname);
      formData.append("BuyerEmail", email);
      formData.append("BuyerPhoneNo", phone);
      formData.append("BuyerGender", gender);
      formData.append("BuyerDateOfBirth", dob);
      formData.append("BuyerAddresses", address);
      formData.append("BuyerPassword", password);
      formData.append(
        "BuyerImage",
        formdata.buyerImage ||
          "https://www.svgrepo.com/download/192244/man-user.svg"
      );

      const res = await axios.post(
        "http://localhost:3000/buyer/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );

      if (res.data.success) {
        console.log(res.data.message);
        console.log("1");
        router.push("/buyer/login");
      } else {
        console.log("2");
        setError(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      // Axios error handling
      if ((error as any).isAxiosError && (error as any).response) {
        console.log("3");
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Error: ${(error as any).response.data.message}`);
      } else {
        console.log("4");
        // Something happened in setting up the request that triggered an Error
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
          {/* First Name */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              First Name
            </label>
            <input
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { firstname?: string }).firstname
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              placeholder="First Name"
              name="firstname"
              value={firstname}
              onChange={onChange}
            />
            {(validationErrors as { firstname?: string }).firstname && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { firstname?: string }).firstname}
              </p>
            )}
          </div>
          {/* Last Name */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Last Name
            </label>
            <input
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { lastname?: string }).lastname
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={lastname}
              onChange={onChange}
            />
            {(validationErrors as { lastname?: string }).lastname && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { lastname?: string }).lastname}
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
          {/* Phone Number */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Phone Number
            </label>
            <input
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { phone?: string }).phone
                  ? "border-red-500"
                  : ""
              }`}
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={phone}
              onChange={onChange}
            />
            {(validationErrors as { phone?: string }).phone && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { phone?: string }).phone}
              </p>
            )}
          </div>
          {/* Gender */}
          <div className="mt-8 max-w-md mx-auto">
            <label
              className="text-sm font-bold text-gray-700 tracking-wide"
              htmlFor="gender"
            >
              Gender
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                onChange={onChange}
                className="mr-2"
              />
              <label
                htmlFor="male"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Male
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={onChange}
                className="mr-2"
              />
              <label
                htmlFor="female"
                className="text-sm font-bold text-gray-700 tracking-wide"
              >
                Female
              </label>
            </div>
            {(validationErrors as { gender?: string }).gender && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { gender?: string }).gender}
              </p>
            )}
          </div>
          {/* Date of Birth */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Date of birth
            </label>
            <input
              type="date"
              name="dob"
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { dob?: string }).dob
                  ? "border-red-500"
                  : ""
              }`}
              value={dob}
              onChange={onChange}
            />
            {(validationErrors as { dob?: string }).dob && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { dob?: string }).dob}
              </p>
            )}
          </div>
          {/* Address */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { address?: string }).address
                  ? "border-red-500"
                  : ""
              }`}
              value={address}
              onChange={onChange}
            />
            {(validationErrors as { address?: string }).address && (
              <p className="text-red-500 text-sm mt-1">
                {(validationErrors as { address?: string }).address}
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
              htmlFor="buyerImage"
            >
              Profile Picture
            </label>
            <div className="relative border border-gray-300 rounded-lg cursor-pointer bg-gray-50 overflow-hidden">
              <input
                className="sr-only"
                aria-describedby="file_input_help"
                id="buyerImage"
                name="buyerImage"
                onChange={onChange}
                type="file"
              />
              <label
                htmlFor="buyerImage"
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                <FontAwesomeIcon icon={faUpload} className="text-gray-500" />
                <span className="ml-2 text-sm text-gray-500">Upload Image</span>
              </label>
            </div>
            <p className="mt-1 text-sm text-black" id="file_input_help">
              SVG, PNG, JPG, or GIF (MAX. 800x400px).
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
