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
import ProductCard from '@/component/common/product/productCard';
import SearchField from '@/component/home/SearchField';

export default function SellerProducts() {
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
        <div className='mx-4 my-4 rounded-md bg-PrimaryColorDarkHover w-auto h-auto text-PureWhite'>
          {/* Products */}
          {/* ekhane ekta addProduct Button thakbe  */}
          {/* product search kora jabe  */}
          <div>
            <button className='btn m-3' >Add Product</button>
            <SearchField/>
          </div>
          
          {/* already add kora product er list thakbe  */}
          <div className='flex gap-3 p-3' >
            <ProductCard/>
            <ProductCard/>
          </div>
          
          
          {/* product sort kora jabe  */}



        </div>
      </div> 
    </>
    
  )
}

