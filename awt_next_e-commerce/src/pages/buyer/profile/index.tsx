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

  useEffect(() => {
    if (typeof window !== "undefined") {
      let accessToken;
      if (sessionStorage.getItem("access_token") !== null) {
        accessToken = sessionStorage.getItem("access_token");
      } else if (localStorage.getItem("access_token") !== null) {
        accessToken = localStorage.getItem("access_token");
      } else {
        console.error("Access token not found.");
        window.location.href = "/buyer/login";
        return;
      }

      let decodedToken = accessToken
        ? (jwt.decode(accessToken) as JwtPayload)
        : null;

      if (decodedToken) {
        const buyerEmail = decodedToken.email as string;
        const id = parseInt(decodedToken.sub || "", 10);
        const buyerFirstName = decodedToken.firstName as string;
        const buyerLastName = decodedToken.lastName as string;
        const buyerimage = `http://localhost:3000/buyer/getImages/${id}`;
        const buyerPhone = decodedToken.phoneNo as string;
        const buyerAddress = decodedToken.address as string;

        setUserEmail(buyerEmail);
        setUserId(id);
        setUserFirstName(buyerFirstName);
        setUserLastName(buyerLastName);
        setUserImage(buyerimage);
        setUserPhone(buyerPhone);
        setUserAddress(buyerAddress);
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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Set the selected file

      try {
        const formData = new FormData();
        formData.append("BuyerImage", file);

        const res = await axios.patch(
          `http://localhost:3000/buyer/update/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (res.data) {
          // Update the userImage state with the URL from the response, if available
          setUserImage(res.data.imageUrl || URL.createObjectURL(file));
          console.log("File updated successfully:", res.data);
        }

        setShowPopup(false);
      } catch (error) {
        console.error("Error updating file:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedFile) {
      // Update the userImage state to show the selected file temporarily
      setUserImage(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);
  
  

  const userProfilePicture =
    userImage || "https://www.svgrepo.com/download/192244/man-user.svg";




  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white overflow-hidden shadow rounded-lg border w-full max-w-3xl">
          <div className="px-6 py-8 relative">
            <div
              className="mx-auto rounded-full overflow-hidden bg-gray-200 w-48 h-48 border-4 border-white cursor-pointer relative group"
              onClick={handleImageClick}
            >
              <Image
                src={userProfilePicture}
                alt={userFirstName || ""}
                width={300}
                height={200}
                objectFit="cover"
                className="object-cover w-full h-full"
              />
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
