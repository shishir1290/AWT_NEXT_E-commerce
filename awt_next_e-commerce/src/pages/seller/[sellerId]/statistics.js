import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React from 'react'

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


export default function SellerStatistics() {
  const router = useRouter();
  const {sellerId} = router.query;
  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <p>productId :  {sellerId}</p> */}


      <div className=''>
      
        <SellerProfile/>
        <div className=' w-auto h-auto text-PureWhite'>
         jnj


        </div>
      </div> 
    </>
    
  )
}

