import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

interface NavbarLink {
  url: string;
  label: string;
  // Add other properties based on your actual data structure
}

export interface NavbarProps {
  links: NavbarLink[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  // State variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    buyerimage: string;
    buyerFirstName: string;
    buyerLastName: string;
    buyerEmail: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  //---------------------------------------------------------------------------------

  const fetchData = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      // Handle the case where the access token is not available
      console.error("Access token not found.");
      return;
    }

    console.log("Access Token:", accessToken);

    try {
      let decodedToken;

      try {
        decodedToken = jwt.decode(accessToken);
        console.log("Decoded Token:", decodedToken);
      } catch (verifyError) {
        console.error("Error during token verification:", verifyError);
        return;
      }

      // Extract buyerEmail and id from the decoded token

      const buyerEmail = (decodedToken as JwtPayload).email as string;
      const id = parseInt((decodedToken as jwt.JwtPayload)?.sub || "", 10);
      const buyerFirstName = (decodedToken as JwtPayload).firstName as string;
      const buyerLastName = (decodedToken as JwtPayload).lastName as string;
      const buyerimage = (decodedToken as JwtPayload).buyerimage as string;

      setUserEmail(buyerEmail);
      setUserId(id);
      setUserFirstName(buyerFirstName);
      setUserLastName(buyerLastName);
      setUserImage(buyerimage);

      // if (buyerEmail && id) {
      //   try {
      //     const res = await axios.get(`http://localhost:3000/buyer/${id}`);
      //     setUserInfo(res.data); // Set user information directly
      //   } catch (error) {
      //     console.error("Error fetching user information:", error);
      //   }
      // }
    } catch (error) {
      console.error("Error decoding token:", (error as Error).message);
    }
  };

  //---------------------------------------------------------------------------------

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  // Construct the user profile picture URL
  const imageUrl = userImage
    ? `http://localhost:3000/uploads/${userImage}`
    : "";

  const userProfilePicture =
    imageUrl || "https://www.svgrepo.com/download/192244/man-user.svg";

  // Toggle handlers
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileMenuOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsMenuOpen(false);
  };

  // Close dropdown when clicking outside
  const handleClose = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  // Return JSX for the Navbar component
  return (
    <nav className="bg-gray-800 sticky top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        {/* Logo and Brand Name */}
        <Link href="/buyer/home" className="flex flex-wrap items-center">
          <Image
            src="https://i.ibb.co/sCxv3Td/Logo.png"
            width={35}
            height={35}
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ml-2">
            E-commerce
          </span>
        </Link>

        {/* Search bar and Links */}
        <div className="w-full mt-2 md:w-9/12 md:mt-0 md:flex md:justify-between">
          {/* Search Form */}
          <form className="w-full md:w-6/12">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 19l-4-4m0-7A7 7 0 1 0 1 8a7 7 0 0 0 14 0Zm0 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Products..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          {/* Profile Links */}
          <div className="md:flex md:items-center">
            {/* User Menu Dropdown */}
            {userEmail != null ? (
              <div className="relative md:ml-4" ref={profileDropdownRef}>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  onClick={handleProfileToggle}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={userProfilePicture}
                    alt="user photo"
                  />
                </button>
                {/* Dropdown menu */}
                <div
                  className={`${
                    isProfileMenuOpen ? "block" : "hidden"
                  } absolute mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600`}
                  id="user-dropdown"
                  ref={profileDropdownRef}
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-white dark:text-white">
                      {userFirstName || "User"} {userLastName || "Name"}
                    </span>
                    <span className="block text-sm text-white truncate dark:text-gray-400">
                      {userEmail || "example@gmail.com"}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        href="/buyer/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/buyer/signout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              // User is not logged in
              <div className="md:ml-4 relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  onClick={handleToggle}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={
                      userProfilePicture ||
                      "https://www.svgrepo.com/download/192244/man-user.svg"
                    }
                    alt="user photo"
                  />
                </button>
                {/* Dropdown menu for login and signup */}
                <div
                  className={`${
                    isMenuOpen ? "block" : "hidden"
                  } absolute mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-50`}
                  id="user-dropdown"
                  ref={dropdownRef}
                >
                  <ul className="py-2 z-50" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        href="/buyer/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/buyer/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Signup
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Create cart button */}
            <div className="md:ml-4 pl-12">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="cart-button"
                onClick={() => {
                  // Add your logic to open the cart or navigate to the cart page
                  console.log("Cart button clicked!");
                }}
              >
                <span className="text-4xl">🛒</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
