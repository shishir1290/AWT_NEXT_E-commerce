import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';

import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/layout/mainCategory';
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Banner from '@/component/home/Banner';
import SellerProfile from '@/component/seller/profile/SellerProfile';
import ReviewCard from '@/component/common/review/reviewCard';
import axios from 'axios';


export default function SellerProducts() {
  const router = useRouter();
  const {sellerId} = router.query;
 const [generalReviews, setGeneralReviews] = useState(null);
 const [afterSalesReviews, setAfterSalesReviews] = useState(null);

 const [refresh, setRefresh] = useState(false);

 const handleRefresh = ()=> {
    setRefresh(!refresh);
 }
  
 const getAllGeneralReviewForSeller = async(token) =>{
  
  const response = await axios.get(`http://localhost:3000/seller/getAllGeneralReview/14`,{
    headers:{
      Authorization: `bearer ${token}`
    }
  });

  if(response.data){

    setGeneralReviews(response.data);
   // console.log(response.data)
  }
}

const getAllAfterSalesReviewForSeller = async(token) =>{

  const response = await axios.get(`http://localhost:3000/seller/getAllAfterSalesReview/14`,{
    headers:{
      Authorization: `bearer ${token}`
    }
  });
  if(response.data){
    console.log("🏠🏠🏠🏠 all afterSales Review : ", response.data)
    setAfterSalesReviews(response.data);
    //console.log(response.data)
  }
}


  useEffect(() => {
    // ei seller er under e joto review ase .. DB theke pull kore niye ashte hobe
    
    const tokenString = localStorage.getItem('authForEcomerce'); 

    getAllAfterSalesReviewForSeller(JSON.parse(tokenString).accessToken);
    getAllGeneralReviewForSeller(JSON.parse(tokenString).accessToken);

  },[])

  useEffect(() => {
    console.log("get review data")
    const tokenString = localStorage.getItem('authForEcomerce'); 

    
    getAllAfterSalesReviewForSeller(JSON.parse(tokenString).accessToken);
    getAllGeneralReviewForSeller(JSON.parse(tokenString).accessToken);

    
  }, [refresh])

  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <p>productId :  {sellerId}</p> */}


      <div className=''>
      
        <SellerProfile/>
        <div className=' w-auto h-auto text-PureWhite'>


          
          {/* Review */}
          

          <div className="tabs tabs-lifted mx-6">
            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover  checked:bg-PrimaryColorLight" aria-label="Review"  />
            
            {/* active:bg-PrimaryColorLight */}
            <div className="tab-content bg-base-100 border-base-300 rounded-box pt-6 ">
              {/* Tab content 1 p-10*/}
              {/* ///////////////////////////////////////////////// */}
              <div className='flex justify-end'>
              <button   onClick={handleRefresh}>Refresh</button>
              </div>
              
              {

                  generalReviews?.map((review) =>{
                  return (
                     <ReviewCard reviewId={review.reviewId}/>
                  )
                    
                })
                
              }
              
              {/* <ReviewCard/>
              
              
              <ReviewCard/>
              <ReviewCard/> */}
              
              {/* ///////////////////////////////////////////////// */}
            </div>

            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover" aria-label="Shipping And Delevery Review"  />
            <div className="tab-content bg-base-100 border-base-300 rounded-box p-10">
              {/* Tab content 2 */}
              <div className='flex justify-end'>
              <button   onClick={handleRefresh}>Refresh</button>
              </div>
            </div>

            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover" aria-label="After Sales Service" checked />
            <div className="tab-content bg-base-100 border-base-300 rounded-box p-10">
              {/* Tab content 3   */}
              <div className='flex justify-end'>
              <button   onClick={handleRefresh}>Refresh</button>
              </div>
              {

              afterSalesReviews?.map((review) =>{

                return (
                  <ReviewCard reviewId={review.reviewId}/>
                )
                  
              })

              }
            </div>
          </div>


        </div>
      </div> 
    </>
    
  )
}

