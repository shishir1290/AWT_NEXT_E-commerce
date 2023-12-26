import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';

import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import MainCategory from '@/layout/mainCategory';
import Banner from '@/component/home/Banner';
import SubNavbarOfSellerProfile from '../subNav/SubNavbarOfSellerProfile';

export default function SellerProfile(props) {
  //<SellerProfile shopName={sellerData?.shopName} offlineShopAddress={sellerData?.offlineShopAddress} shopGoogleMapLink={sellerData?.googleMapLocation}/>
        
  
  const {shopName,offlineShopAddress,shopGoogleMapLink, userId, sellerImage } =  props;

  const [tokenString, setTokenString] = useState(null);

  useEffect(() => {
    const tokenString = localStorage.getItem('authForEcomerce');    
    setTokenString(JSON.parse(tokenString));
  },[])

  // const router = useRouter();
  // const {sellerId} = router.query;
  return (
    <>
    
        <div className="grid grid-cols-12 ">

            <div className="hidden lg:block md:col-span-2  lg:col-span-2 ">
             
            </div>
            
            <div class="col-span-3 md:col-span-4 lg:col-span-4  ">
              {/* flex justify-start xxl:justify-end */}
              <div className='rounded-lg  flex flex-col  justify-center content-center'>
                {/* Main Category  flex-col*/}
                {/* // Shop logo image  */}
                {
                  sellerImage? 
                  (<>
                  <Image
                className="rounded-lg"
                src={`http://localhost:3000/seller/getLoggedInUserImage/?imageName=${sellerImage}`}
                // src={LenovoPc124}
                width={120}
                height={150}
                quality={75} // default is 75
                alt="Picture of banner"
                />
                  
                  </>):(<>
                  
                    <Image
                className="rounded-lg"
                 src={LenovoPc124}
                width={120}
                // height={200}
                quality={75} // default is 75
                alt="Picture of banner"
                />
                  </>)
                }
                
                {/* /////////// */}
                {/* // Shop Name */}
                <h1 className=''>{shopName}</h1>
                {/* ml-[80px] mt-3 */}
                {/* // offline Shop Address Logo And Details  */}
                <div className='flex'>
                    <MdOutlineLocationCity  className=''/>
                    {/* ml-[80px] mt-1 mr-2 */}
                    <h1>{offlineShopAddress}</h1> 
                    </div>
                    
                    {/* // google map link Logo And Details  */}
                    <div className='flex'>
                    <FaMapLocationDot className=''/>
                    {/* ml-[80px]  mt-1 mr-2 */}
                      Google Map Link 
                      <a target='_blank' href={shopGoogleMapLink} ><FaLink  className='mt-1 ml-2'/></a>
                    
                </div>
              {/* ////////////// */}
              </div>
              
              
            </div>
            
            <div className="col-span-9 xl:col-span-6 md:col-span-6 lg:col-span-6 ">
                  <div className='pt-[0px] '>
                    {/* Banner For Seller */}
                    <Banner/>
                  </div>
                    
            </div>
            
        </div>
        {/* // ekhon amra product er subNavbar er design korbo  */}
        <SubNavbarOfSellerProfile userId={tokenString?.userId}/>
        
    </>
    
  )
}

