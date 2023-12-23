// Import necessary modules
import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

// Define interfaces
interface NavbarLink {
  url: string;
  label: string;
  // Add other properties based on your actual data structure
}

export interface NavbarProps {
  links: NavbarLink[];
}

// Navbar component
const Navbar: React.FC<NavbarProps> = ({ links }) => {

  const router = useRouter();
  // State variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [navbarUrl, setNavbarUrl] = useState('manager/signin');
  const [userInfo, setUserInfo] = useState<{
    managerimage: string;
    managerEmail: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch user data from NestJS
  const fetchData = async () => {
    const userEmailFromsessionStorage = sessionStorage.getItem("userEmail");
    setUserEmail(userEmailFromsessionStorage);

    if (userEmailFromsessionStorage) {
      const userIdString = sessionStorage.getItem("userId");
      const userId = userIdString ? parseInt(userIdString, 10) : null;

      if (userId != null) {
        try {
          const res = await axios.get(`http://localhost:3000/manager/${userId}`);
          setUserInfo(res.data); // Set user information directly
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  // Construct the user profile picture URL
  const imageUrl = userInfo
    ? `http://localhost:3000/uploads/${userInfo.managerimage}`
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


  useEffect(() => {
    const signinAuth = sessionStorage.getItem("userEmail")

    if (signinAuth == null) {
      setNavbarUrl("signin")
    } else {
      setNavbarUrl("../home")
    }
  }, [])
  // Return JSX for the Navbar component
  return (
    <nav className="bg-cyan-800 sticky top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        {/* Logo and Brand Name */}
        <Link href={navbarUrl} className="flex flex-wrap items-center">
          <Image
            src="https://i.ibb.co/vDsjNfY/Logo.png"
            width={35}
            height={35}
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ml-2">
            E-commerce
          </span>
        </Link>

        {/* Search bar and Links */}
        

          {/* Profile Links */}
          <div className="md:flex md:items-center">
            {/* User Menu Dropdown */}
            {userEmail != null ? (
              <div className="relative md:ml-4" ref={profileDropdownRef}>
                <button
                  type="button"
                  className="flex text-sm bg-cyan-800 rounded-full md:me-0 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-600"
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
                  className={`${isProfileMenuOpen ? "block" : "hidden"
                    } absolute mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-cyan-700 dark:divide-cyan-600`}
                  id="user-dropdown"
                  ref={profileDropdownRef}
                >
                  
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        href="/manager/profile"
                        className="block px-4 py-2 text-sm text-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-600 dark:text-cyan-200 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    
                    <li>
                      <Link
                        href="/manager/signout"
                        className="block px-4 py-2 text-sm text-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-600 dark:text-cyan-200 dark:hover:text-white"
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
                  className="flex text-sm bg-cyan-800 rounded-full md:me-0 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-600"
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
                {/* Dropdown menu for signin and signup */}
                <div
                  className={`${isMenuOpen ? "block" : "hidden"
                    } absolute mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-cyan-700 dark:divide-cyan-600 z-50`}
                  id="user-dropdown"
                  ref={dropdownRef}
                >
                  <ul className="py-2 z-50" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        href="/manager/signin"
                        className="block px-4 py-2 text-sm text-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-600 dark:text-cyan-200 dark:hover:text-white"
                      >
                        Signin
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/manager/signup"
                        className="block px-4 py-2 text-sm text-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-600 dark:text-cyan-200 dark:hover:text-white"
                      >
                        Signup
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}


          </div>
        </div>
    </nav>
  );
};

export default Navbar;
