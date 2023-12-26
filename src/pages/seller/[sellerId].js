import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import LenovoPc124 from '../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/layout/mainCategory';
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Banner from '@/component/home/Banner';
import SellerProfile from '@/component/seller/profile/SellerProfile';
import api from '../../utils/api';
import axios from 'axios';

export default function SellerProfileDetails() {
  const router = useRouter();
  const {sellerId} = router.query;
  const [error, setError] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [sellerImage, setSellerImage] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    sellerName: "",
    sellerEmailAddress: "",
    sellerPassword: "",
    sellerPhoneNumber:"",
    sellerDescription: "",
    sellerImage: "",
    shopName: "",
    shopDescription: "",
    shopLogo: "",
    shopName: "",
    status: "",
    rating:"",
    offlineShopAddress: "",
    googleMapLocation: "",
    
  });
  const [tokenString, setTokenString] = useState(null);
  // ekhon user logged in thakle .. tar jonno .. shob data .. database theke pull kore niye ashbo axios 
  // er maddhome ..  


  const [refresh, setRefresh] = useState(false);

  const handleRefresh = ()=> {
    setTimeout(() => {
      setRefresh(false);
    }, 1000)
      
  }

  useEffect(() => {
    try{
      // http://localhost:3000/seller/14
      

      const tokenString = localStorage.getItem('authForEcomerce');    
      
      getSellerDataFromBackEnd(JSON.parse(tokenString).accessToken);

      // console.log("seller profile 🟢useEffect-> sellerData from database .. formData from front-End🟢", sellerData,"==🔰==", formData)
          
      

      
    }catch(error){
      setError(error);
      console.log("Error 🔴", error)
    }
     
  },[sellerId,refresh])


  const getSellerDataFromBackEnd = async(token) =>{
    const response = await axios.get(`http://localhost:3000/seller/${sellerId}`,
    {
      headers: {
        // 'Content-Type': 'application/json',
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxsZXJFbWFpbEFkZHJlc3MiOiJhQGdtYWlsLmNvbSIsInN1YiI6IjE0IiwiaWF0IjoxNzAxMTk1NTg2LCJleHAiOjE3MDExOTU2NDZ9.gLX9nHTlLha0_GREcsc8nrlM0hHgJUsTsA5CZgryrEk
        Authorization: `Bearer ${token}`,
      },
    }
    );
    if(response){
      //console.log("data🔰 : ", response.data)
      setSellerData(response.data);
      setFormData(sellerData);
      setSellerImage(response.data.sellerImage);
      // return response.data;
    }
  }

  useEffect(() => {
    if(sellerData){
      // sellerData.sellerPassword =  "";

      // setFormData(sellerData);
    }
    
  }, [sellerData])

  const onChange = (e) => {
   // console.log("🔴 onChange e.target.name : ", e.target.name, e.target.value)
    //setSellerData    setFormData
    setSellerData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // ei ta xoss way to play with form data
    }));
};

const onFileChange = (e) => {
  // Handle file upload and update formData with the file data
  //const file = e.target.files[0];
  const sellerImage = e.target.files[0];
  // const File = {
  //   fieldName: 'sellerImage',
  //   originalFileName: e.target.files[0].name,
  //   encoding: e.target.files[0].encoding,
  //   mimetype: e.target.files[0].type,
  
  // }

  console.log("fileName : ", sellerImage)
  setSellerData((prevState) => ({
    ...prevState,
    sellerImage: sellerImage,
  }));
  console.log("formData : ", sellerData)
};

const handleSubmit = async (e) => {
  setRefresh(!refresh);

 

  e.preventDefault();
  console.log("after handleSubmit : ", sellerData)
  
  setError("");


  try{
    const tokenString = localStorage.getItem('authForEcomerce'); 
    setTokenString(tokenString); 
    console.log("sellerData : 🟢",sellerData);  

    
    

      const response = await axios.patch('http://localhost:3000/seller/update/14',
      sellerData
      ,
      {
        headers: { Authorization: `Bearer ${JSON.parse(tokenString).accessToken}`,
        "Content-Type": "multipart/form-data", 
        "Cache-Control": "no-cache",
      },
      }
      );
      if(response){
        console.log("done after form submitting 🔰🔰 : ",response.data)
         setTimeout(() => {
          setRefresh(!refresh);
         },1000)
      }
      
//headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxsZXJFbWFpbEFkZHJlc3MiOiJhQGdtYWlsLmNvbSIsInN1YiI6IjE0IiwiaWF0IjoxNzAxMTk1NTg2LCJleHAiOjE3MDExOTU2NDZ9.gLX9nHTlLha0_GREcsc8nrlM0hHgJUsTsA5CZgryrEk`,
        
      

    }catch (error) {
      console.error("FormSubmission failed from [sellerId].js : ",  error.message);
      setError("Form Value is Wrong");
      
    }

};

  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <p>productId :  {sellerId}</p> */}


      <div className=''>
      
        <SellerProfile sellerImage={sellerImage} userId={tokenString?.userId} shopName={sellerData?.shopName} offlineShopAddress={sellerData?.offlineShopAddress} shopGoogleMapLink={sellerData?.googleMapLocation}/>
        <div className='mx-4 my-4 rounded-md bg-PrimaryColorDarkHover p-10 w-auto h-auto text-PureWhite'>
          {/* Personal Details */}
          {/* // ekhane amra seller er details dekhabo and edit korar option dibo  */}
          {/* ////////////////////////////////////////////////////// */}
          <form method="post" onSubmit={handleSubmit}>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-6 group">
                  {/* //formData */}
                    <input type="text" value={sellerData?.sellerName} onChange={onChange} name="sellerName" id="sellerName" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="sellerName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Seller name</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="email" value={sellerData?.sellerEmailAddress} onChange={onChange} name="sellerEmailAddress" id="sellerEmailAddress" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="sellerEmailAddress" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Email name</label>
                </div>
              </div>

              <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-6 group">
              {/* value={sellerData?.sellerPassword} */}
                  <input type="password"  onChange={onChange} name="sellerPassword" id="sellerPassword" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="sellerPassword" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Password</label>
              </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="tel"  onChange={onChange} value={sellerData?.sellerPhoneNumber} /* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */ name="sellerPhoneNumber" id="sellerPhoneNumber" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="sellerPhoneNumber" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Phone number (01XXXXXXXXX)</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <textarea type="text" value={sellerData?.sellerDescription} onChange={onChange}  name="sellerDescription" id="sellerDescription" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="sellerDescription" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Description</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="file" name="sellerImage" onChange={onFileChange} id="sellerImage" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="sellerImage" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Image</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" value={sellerData?.shopName} onChange={onChange} name="shopName" id="shopName" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="shopName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Shop name</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <textarea type="text" value={sellerData?.shopDescription} onChange={onChange} name="shopDescription" id="shopDescription" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="shopDescription" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Shop Description</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="file" name="shopLogo" id="shopLogo" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="shopLogo" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Shop Logo</label>
                </div>
                {/* //StatusId, rating ,offlineShopAddress, googleMapLocation*/}
                <div>
                  <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                  <select name='status' id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled selected>---Select---</option>
                  <option disabled selected>{sellerData?.status}</option>
                    <option disabled selected>Local Seller</option>
                    <option></option>
                    <option disabled>Active Seller</option>
                    <option disabled>Inactive Seller</option>
                    <option disabled>Suspended Seller</option>
                    <option disabled>Verified Seller</option>

                    <option disabled>Premium Support Seller</option>
                    <option disabled>Best Seller</option>
                    <option disabled>Top Seller</option>
                  </select>
                </div>
                {/* //rating ,offlineShopAddress, googleMapLocation*/}
                <div class="relative z-0 w-full mb-6 group">
                    <input disabled value={sellerData?.rating} onChange={onChange}  type="text" name="rating" id="rating" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="rating" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Rating</label>
                </div>
                {/* // offlineShopAddress googleMapLocation*/}
                <div class="relative z-0 w-full mb-6 group">
                    <textarea type="text" value={sellerData?.offlineShopAddress} onChange={onChange} name="offlineShopAddress" id="offlineShopAddress" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="offlineShopAddress" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Offline Shop Address</label>
                </div>
                {/* // googleMapLocation*/}
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" value={sellerData?.googleMapLocation} onChange={onChange} name="googleMapLocation" id="googleMapLocation" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="googleMapLocation" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Google Map Location Link</label>
                </div>
              </div>
              <button  type="submit" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              {
                refresh?(<>
                  <span className="loading loading-spinner loading-md"></span>
                  {
                    // setTimeout(() => {
                    //   setRefresh(false);
                    // }, 1000
                    // )
                    handleRefresh()
                  }
                </>):(<>
                
                </>)
              }
            </form>
          {/* ////////////////////////////////////////////////////// */}
        </div>
      </div> 
    </>
    
  )
}

