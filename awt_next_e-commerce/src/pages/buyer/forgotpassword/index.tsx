import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Index = () => {

    const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [formdata, setFormdata] = useState({
    email: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    newpassword: "",
    confirmpassword: "",
  });

  const { email, newpassword, confirmpassword } = formdata;

  const openVerificationModal = async () => {
    // Validate email
    const emailValidation = validateEmail(email);
    if (emailValidation !== true) {
      setErrors({ ...errors, email: emailValidation });
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(newpassword);
    if (passwordValidation !== true) {
      setErrors({ ...errors, newpassword: passwordValidation });
      return;
    }

    if (newpassword !== confirmpassword) {
      setErrors({ ...errors, confirmpassword: "Passwords do not match" });
      return;
    }

    setIsVerificationModalOpen(true);
    console.log("Email:", email);

    try {
      // Use POST instead of GET for security when handling sensitive information
      const resEmail = await axios.get(
        `http://localhost:3000/buyer/sendEmail/${email}`
      );

      if (resEmail) {
        console.log("Verification code sent:", resEmail.data.code);
      } else {
        setError("This email is not valid");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Error sending email");
    }
  };

  const closeVerificationModal = () => {
    setIsVerificationModalOpen(false);
  };

  const handleVerificationSubmit = async () => {
    // Verification code and password validations can be added here if needed

    try {
      const verifyEmail = await axios.get(
        `http://localhost:3000/buyer/verifyEmail?email=${email}&code=${verificationCode}`
      );

      if (verifyEmail) {
        // Assuming handleForgetPassword is defined somewhere in your code
        handleForgetPassword();
        closeVerificationModal();
      } else {
        setError("Verification code is required");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setError("Error verifying email");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your form submission logic here
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);

    if (!isValid) {
      return "Invalid email format";
    }

    return true;
  };

  const validatePassword = (value: string) => {
    const isLengthValid = value.length >= 8;
    const containsLetters = /[a-zA-Z]/.test(value);
    const containsNumbers = /\d/.test(value);
    const containsSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!isLengthValid) {
      return "Password must be at least 8 characters";
    }

    if (!containsLetters || !containsNumbers || !containsSymbols) {
      return "Password must contain 2 letters, 2 numbers, and 2 symbols";
    }

    return true;
  };

  const handleForgetPassword = async () => {
    // Your logic for handling forgotten password
    const formData = new FormData();
    formData.append("BuyerPassword", newpassword);

    const res = await axios.patch(
      `http://localhost:3000/buyer/updatePassword/${email}`,
      formData,
      {
        headers:{
            'Content-Type': 'application/json',
        }
      },
    );

    if (res.data) {
        router.push("/buyer/login");
    } else {
      setError("Error updating password");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
  <div className="w-full max-w-md bg-white rounded shadow p-10">
    <h1 className="mb-8 text-3xl font-bold">Forget Password</h1>
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="mb-5">
        <label className="mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded shadow focus:outline-none"
          value={email}
          onChange={(e) => {
            setFormdata({ ...formdata, email: e.target.value });
            setErrors({ ...errors, email: "" });
          }}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div className="mb-5">
        <label className="mb-2 font-semibold">New Password</label>
        <input
          type="password"
          name="newpassword"
          placeholder="New Password"
          className="w-full px-4 py-2 border rounded shadow focus:outline-none"
          value={newpassword}
          onChange={(e) => {
            setFormdata({ ...formdata, newpassword: e.target.value });
            setErrors({ ...errors, newpassword: "" });
          }}
        />
        {errors.newpassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newpassword}</p>
        )}
      </div>
      <div className="mb-5">
        <label className="mb-2 font-semibold">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded shadow focus:outline-none"
          value={confirmpassword}
          onChange={(e) => {
            setFormdata({
              ...formdata,
              confirmpassword: e.target.value,
            });
            setErrors({ ...errors, confirmpassword: "" });
          }}
        />
        {errors.confirmpassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmpassword}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 mb-4 text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none"
        onClick={openVerificationModal}
      >
        Reset Password
      </button>
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
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
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
</div>

    </Layout>
  );
};

export default Index;
