import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { useCart } from "./cartContext";
import { useRouter } from "next/router";

interface NavbarLink {
  url: string;
  label: string;
  // Add other properties based on your actual data structure
}

export interface NavbarProps {
  links: NavbarLink[];
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string; // URL to the product image
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // State variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState<{
    buyerimage: string;
    buyerFirstName: string;
    buyerLastName: string;
    buyerEmail: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const { cartCount, updateCartCount } = useCart();

  //---------------------------------------------------------------------------------

  const fetchData = async () => {
    const accessToken =
      sessionStorage.getItem("access_token") ||
      localStorage.getItem("access_token");

      setAccessToken(accessToken);

      if(accessToken === null){
        console.error("Access token is null.");
      }

    try {
      let decodedToken;

      try {
        if (accessToken) {
          decodedToken = jwt.decode(accessToken);
        } else {
          console.error("Access token is null.");
          return;
        }
      } catch (verifyError) {
        console.error("Error during token verification:", verifyError);
        return;
      }

      // Extract buyerEmail and id from the decoded token

      const buyerEmail = (decodedToken as JwtPayload).email as string;
      const id = parseInt((decodedToken as jwt.JwtPayload)?.sub || "", 10);

      const buyerFirstName = (decodedToken as JwtPayload).firstName as string;
      const buyerLastName = (decodedToken as JwtPayload).lastName as string;
      const buyerimage = `http://localhost:3000/buyer/getImages/${id}`;

      setUserEmail(buyerEmail);
      setUserId(id);
      setUserFirstName(buyerFirstName);
      setUserLastName(buyerLastName);
      setUserImage(buyerimage);
    } catch (error) {
      console.error("Error decoding token:", (error as Error).message);
    }
  };

  //---------------------------------------------------------------------------------

  useEffect(() => {
    fetchData();
  }, []);

  const userProfilePicture =
    userImage || "https://www.svgrepo.com/download/192244/man-user.svg";

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle cart button click
  useEffect(() => {
    getCartItemsFromCookies();
  }, []);

  // Function to handle cart button click
  const handleCartButtonClick = () => {
    // Toggle the sidebar state
    setIsSidebarOpen(!isSidebarOpen);
    // Fetch updated cart items from cookies
    getCartItemsFromCookies();
  };

  const getCartItemsFromCookies = (): CartItem[] => {
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart")!)
      : [];

    return existingCart;
  };

  useEffect(() => {
    const cartItems = getCartItemsFromCookies();
    setCartItems(cartItems);
    updateCartCount(cartItems.length);
  }, []);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove the item from the cart
      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);

      // Update the cart items in cookies
      Cookies.set("cart", JSON.stringify(updatedCartItems));

      // Update the cart items in state
      setCartItems(updatedCartItems);
    } else {
      // Update the cart items in state
      const updatedCartItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );

      // Update the cart items in cookies
      Cookies.set("cart", JSON.stringify(updatedCartItems));

      // Update the cart items in state
      setCartItems(updatedCartItems);
    }
  };

  const handleSearch = () => {
    const searchInput = document.getElementById(
      "default-search"
    ) as HTMLInputElement;

    // Use the router to navigate to the search result page
    router.push(`/products/searchResult/${searchInput.value}`);
  };

  const checkoutOrder = () => {
    if (accessToken) {
      router.push(`/orders/checkout`);
    } else {
      router.push(`/buyer/login`);
    }
  };

  return (
    <nav className="bg-gray-800 sticky top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        {/* Logo and Brand Name */}
        <Link href="/buyer/home" className="flex flex-wrap items-center">
          <img
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
          <form
            className="w-full md:w-6/12"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              handleSearch(); // Call the handleSearch function when the form is submitted
            }}
          >
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
                        href="/buyer/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/buyer/order"
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
            <div className="md:ml-4 pl-12 relative">
              {/* Use a button to trigger the sidebar */}
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="cart-button"
                onClick={handleCartButtonClick}
              >
                <span className="text-4xl">🛒</span>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 p-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                  {cartCount ?? 0}
                </span>
              </button>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
              <div className="fixed top-0 right-0 h-full bg-slate-200 w-1/4 shadow-lg overflow-y-auto">
                <div className="p-4">
                  {/* ----------------------------------------------------------------------- */}
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4">
                      Shopping Cart
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <svg
                        className="w-6 h-6 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* -------------------------------------------------------------------------------------- */}
                  {cartItems.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Product</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-center">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id} className="mb-4 border-b pb-4">
                            <td className="flex items-center">
                              <img
                                src={`http://localhost:3000/product/getImages/${item.id}`}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="mr-4 rounded-md"
                              />
                              <div className="flex-grow">
                                <div className="font-semibold">{item.name}</div>
                              </div>
                            </td>
                            <td className="text-center">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="text-white bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded-full focus:outline-none focus:ring focus:border-blue-300"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>
                                <span className="text-lg font-bold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-full focus:outline-none focus:ring focus:border-blue-300"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="text-center">
                              {item.quantity * item.price}{" "}
                              <span className="text-2xl font-bold">৳</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-600">Your cart is empty.</p>
                  )}
                  <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                  {/* Subtotal, VAT, and Total Price */}
                  <table className="w-full">
                    <tbody>
                      <tr className="text-gray-700 my-4">
                        <td className="font-bold text-xl">Sub Price:</td>
                        <td className="mx-28"></td>
                        <td className="text-right text-xl font-bold">
                          {cartItems.reduce(
                            (subTotal, item) =>
                              subTotal + item.quantity * item.price,
                            0
                          )}{" "}
                          <span className="text-2xl font-bold">৳</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <hr />
                        </td>
                      </tr>
                      <tr className="text-gray-700 my-4">
                        <td className="font-bold text-xl">5% VAT:</td>
                        <td className="mx-28"></td>
                        <td className="text-right text-xl font-bold">
                          {cartItems.reduce(
                            (VAT, item) =>
                              VAT + item.quantity * item.price * 0.05,
                            0
                          )}{" "}
                          <span className="text-2xl font-bold">৳</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <hr />
                        </td>
                      </tr>
                      <tr className="text-gray-700 my-4">
                        <td className="font-bold text-xl">Total Price:</td>
                        <td className="mx-28"></td>
                        <td className="text-right text-xl font-bold">
                          {cartItems.reduce(
                            (total, item) => total + item.quantity * item.price,
                            0
                          ) +
                            cartItems.reduce(
                              (VAT, item) =>
                                VAT + item.quantity * item.price * 0.05,
                              0
                            )}{" "}
                          <span className="text-2xl font-bold">৳</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <hr />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <hr className="w-full h-1 mx-auto bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                  {/* Continue Shopping and Checkout buttons inside the sidebar */}
                  <div className="fixed bottom-0 right-0 bg-slate-200 p-4 sm:p-8">
                    <button
                      type="button"
                      className="btn bg-blue-500 text-white lg:px-40 lg:py-2 lg:my-5 md:px-6 md:py-2 md:my-3 sm:px-4 sm:py-2 rounded-md hover:bg-gray-900"
                      onClick={checkoutOrder}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
