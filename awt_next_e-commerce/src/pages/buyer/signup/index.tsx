import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/layout";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

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
  const [validationErrors, setValidationErrors] = useState({});

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

  const onChange = (e: any) => {
    if (
      e.target.type === "file" &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      setFormdata({ ...formdata, [e.target.name]: e.target.files[0] });
    } else {
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

  // ------------------------------------------------------------------------------------

  const openVerificationModal = async () => {
    setIsVerificationModalOpen(true);
    // Send a request to generate and send the verification code to the user's email
    // This should be done on the server side
    try {
      const resEmail = await axios.get(`http://localhost:3000/buyer/sendEmail/${email}`);
      if (resEmail) {
        console.log("Verification code sent:", resEmail.data.code);
        // No need to call handleVerificationSubmit here; it will be called from the modal
      } else {
        setError("This email is not valid");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Error sending email");
    }
  };

  //----------------------------------------------------------------------------------------------

  const closeVerificationModal = () => {
    setIsVerificationModalOpen(false);
  };

  //----------------------------------------------------------------------------------------------

  const handleVerificationSubmit = async () => {
    console.log("verificationCode", verificationCode);

      const verifyEmail = await axios.get(
        `http://localhost:3000/buyer/verifyEmail?email=${email}&code=${verificationCode}`
      );
      console.log("verifyEmail", verifyEmail.data);

      if (verifyEmail) {
        handleSignup(); // Move the handleSignup call here, after successful verification
        closeVerificationModal(); // Close the modal after successful verification
      } else {
        setError("Verification code is required");
      }
  };

  //--------------------------------------------------------------------------------------

  const handleSubmit = async (e: any) => {
    e.preventDefault();

  };

  //--------------------------------------------------------------------------------------

  const handleSignup = async () => {
    closeVerificationModal();
    try {
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
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        router.push("/buyer/login");
      } else {
        setError(res.data.message);
      }
    } catch (error: any) {
      if (error.isAxiosError && error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error:", error.message);
        setError("An error occurred during signup.");
      }
    }
  };

  // function togglePasswordVisibility(event: MouseEvent<SVGSVGElement, MouseEvent>): void {
  //   throw new Error("Function not implemented.");
  // }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          {/* Password */}
          <div className="mt-8 max-w-md mx-auto relative">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Password
            </label>
            <input
              className={`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                (validationErrors as { password?: string }).password
                  ? "border-red-500"
                  : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {/* Eye icon for toggling password visibility */}
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
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
              PNG, JPG, JPEG
            </p>
          </div>
          {/* Submit Button */}
          <div className="mt-10 max-w-md mx-auto">
            <button
              type="submit"
              onClick={openVerificationModal}
              className="w-full px-4 py-2 tracking-wide font-bold text-black hover:text-white border-2 border-green-700 bg-emerald-200 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm text-center me-2 mb-2 "
            >
              Signup
            </button>
          </div>
          {/* Verification Code Modal */}
          {isVerificationModalOpen && (
            <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              <div className="relative bg-white p-4 rounded-md max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Verification Code</h2>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                    onClick={closeVerificationModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                    onClick={handleVerificationSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
