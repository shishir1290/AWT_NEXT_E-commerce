import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Eye, EyeOff } from "react-feather";
import Layout from "@/components/layout";

const Login = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { email, password } = formdata;

  const onChange = (e: any) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateEmail = (value: string) => {
    // Email format validation using a basic regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string) => {
    // Password length validation (at least 8 characters)
    const isLengthValid = value.length >= 8;

    // Password content validation (at least 2 letters, 2 numbers, and 2 symbols)
    const containsLetters = /[a-zA-Z]/.test(value);
    const containsNumbers = /\d/.test(value);
    const containsSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return (
      isLengthValid && containsLetters && containsNumbers && containsSymbols
    );
  };

  const setSession = (access_token: string) => {
    sessionStorage.setItem("access_token", access_token);

    if (rememberMe) {
      localStorage.setItem("access_token", access_token);
    } else {
      localStorage.removeItem("access_token");
    }
  };

  // const setSessionId = (id: number) => {
  //   localStorage.setItem("userId", id.toString());
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setErrors({
        ...errors,
        password:
          "Password must be at least 8 characters and contain 2 letters, 2 numbers, and 2 symbols",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/buyer/login",
        {
          BuyerEmail: email,
          BuyerPassword: password,
        },
        { timeout: 5000 }
      );

      if (res.data.access_token) {
        setSession(res.data.access_token);
        router.push("/buyer/home");
      } else {
        setErrors({ ...errors, error: "Invalid email id and password" });
      }
    } catch (error) {
      setErrors({ ...errors, error: "Invalid email id and password" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen pt-20">
        <form method="POST" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center">Login page</h1>
          <div className="mt-8 max-w-md mx-auto relative z-0">
            {errors.error && (
              <p className="text-red-500 text-sm mt-1 font-bold">
                {errors.error}
              </p>
            )}
          </div>
          <div className="mt-8 max-w-md mx-auto relative z-0">
            <input
              className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                errors.email && "border-red-500"
              }`}
              type="email"
              placeholder=""
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <label
              htmlFor="email"
              className="absolute text-sm font-semibold text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mt-8 max-w-md mx-auto relative z-0">
            <input
              className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer${
                errors.password && "border-red-500"
              }`}
              type={showPassword ? "text" : "password"}
              placeholder=""
              name="password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <label
              htmlFor="password"
              className="absolute text-sm font-semibold text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Password
            </label>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {/* Eye icon for toggling password visibility */}
              {showPassword ? (
                <EyeOff
                  className="text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Eye
                  className="text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* //------------------------------------------------------------------------------ */}
          {/* Remember me checkbox */}
          <div className="mt-8 max-w-md mx-auto relative z-0">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <div className="mt-8 max-w-md mx-auto relative z-0">
            <a
              href="/buyer/forgotpassword"
              className="text-sm text-gray-600 hover:underline hover:text-gray-900"
            >
              Forgot Password?
            </a>
          </div>

          {/* //------------------------------------------------------------------------------ */}
          <div className="mt-8 max-w-md mx-auto">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
            >
              Login
            </button>
          </div>
        </form>
        <br />
      </div>
    </Layout>
  );
};

export default Login;
