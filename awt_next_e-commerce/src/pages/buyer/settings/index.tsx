import Layout from "@/components/layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import axios from "axios";

const Settings = () => {
  const router = useRouter();
  const [user, setUser] = React.useState(null);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);

  const handleFirstNameChange = (e: any) => setUserFirstName(e.target.value);
  const handleLastNameChange = (e: any) => setUserLastName(e.target.value);
  const handleEmailChange = (e: any) => setUserEmail(e.target.value);
  const handleAddressChange = (e: any) => setUserAddress(e.target.value);
  const handlePhoneChange = (e: any) => setUserPhone(e.target.value);

  const access_token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("access_token") ||
        localStorage.getItem("access_token")
      : null;

  useEffect(() => {
    if (!access_token) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } else {
      const decodedToken = jwt.decode(access_token) as JwtPayload;

      setUserId(parseInt(decodedToken?.sub || "", 10) || null);
    }
  }, [access_token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/buyer/${userId}`);
        if (res.data) {
          setUserFirstName(res.data.buyerFirstName);
          setUserLastName(res.data.buyerLastName);
          setUserEmail(res.data.buyerEmail);
          setUserAddress(res.data.buyerAddresses);
          setUserPhone(res.data.buyerPhoneNo);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/buyer/update/${userId}`,
        {
          buyerFirstName: userFirstName,
          buyerLastName: userLastName,
          buyerAddresses: userAddress,
          buyerPhoneNo: userPhone,
        }
      );

      if (res.data) {
        setUserFirstName(res.data.buyerFirstName);
        setUserLastName(res.data.buyerLastName);
        setUserAddress(res.data.buyerAddresses);
        setUserPhone(res.data.buyerPhoneNo);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3">Settings</h2>
            <p className="text-sm mb-6">Manage your account settings.</p>

            <div className="mb-4">
              <label className="text-sm block mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                value={userFirstName || ""}
                id="firstName"
                className="w-full px-4 py-2 border rounded shadow focus:outline-none"
                onChange={handleFirstNameChange}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm block mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                value={userLastName || ""}
                id="lastName"
                className="w-full px-4 py-2 border rounded shadow focus:outline-none"
                onChange={handleLastNameChange}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm block mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                value={userEmail || ""}
                id="email"
                className="w-full px-4 py-2 border rounded shadow focus:outline-none"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="text-sm block mb-1" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                value={userAddress || ""}
                id="address"
                className="w-full px-4 py-2 border rounded shadow focus:outline-none"
                onChange={handleAddressChange}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm block mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                value={userPhone || ""}
                id="phone"
                className="w-full px-4 py-2 border rounded shadow focus:outline-none"
                onChange={handlePhoneChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="px-6 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none"
                onClick={() => {
                  fetchUser(); // Update user info on button click
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
