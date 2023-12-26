import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import Image from "next/image";
import Layout from "@/components/layout";
import axios from "axios";

const UserProfile = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access_token") || localStorage.getItem("access_token");

      if (!accessToken) {
        console.error("Access token not found.");
        window.location.href = "/buyer/login";
        return;
      }

      const decodedToken = jwt.decode(accessToken) as JwtPayload;

      if (decodedToken) {
        const id = parseInt(decodedToken.sub || "", 10);

        const buyerImage = `http://localhost:3000/buyer/getImages/${id}`;

        const fetchUserData = async () => {
          try {
            const res = await axios.get(`http://localhost:3000/buyer/${id}`);
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

        setUserId(id);
        setUserImage(buyerImage);
        fetchUserData();
      } else {
        window.location.href = "/buyer/login";
      }
    }
  }, []);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      try {
        const formData = new FormData();
        formData.append("BuyerImage", file);

        const res = await axios.patch(
          `http://localhost:3000/buyer/updateImage/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        );

        if (res.data) {
          setUserImage(res.data.imageUrl || userImage);
        }

        setShowPopup(false);
      } catch (error) {
        console.error("Error updating file:", error);
      }
    }
  };

  useEffect(() => {
    setUserProfilePicture(userImage || "https://www.svgrepo.com/download/192244/man-user.svg");
  }, [userImage]);


  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white overflow-hidden shadow rounded-lg border w-full max-w-3xl">
          <div className="px-6 py-8 relative">
            <div
              className="mx-auto rounded-full overflow-hidden bg-gray-200 w-48 h-48 border-4 border-white cursor-pointer relative group"
              onClick={handleImageClick}
            >
              {userProfilePicture && (  
              <img 
                src={userProfilePicture ? userImage || "": "https://www.svgrepo.com/download/192244/man-user.svg"}
                alt={userFirstName || ""}
                width={300}
                height={200}
              
                className="object-cover w-full h-full"
              />
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-semibold bg-black bg-opacity-75 p-2 rounded-md">
                  Edit
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-8">
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {`${userFirstName} ${userLastName}`}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {userEmail}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {userPhone}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {userAddress}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      {/* Popup for updating/deleting image */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
          onClick={handlePopupClose}
        >
          <div
            className="bg-white p-4 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg font-semibold mb-4">Update Image</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={(e) => handleFileChange(e)}
            />

            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Upload Image
            </label>
            
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-500"
              onClick={handlePopupClose}
            >
              X
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserProfile;
