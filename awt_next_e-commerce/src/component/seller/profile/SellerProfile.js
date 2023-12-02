import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React from 'react'

import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';

import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import MainCategory from '@/layout/mainCategory';
import Banner from '@/component/home/Banner';
import SubNavbarOfSellerProfile from '../subNav/SubNavbarOfSellerProfile';

export default function SellerProfile() {
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
                <Image
                className="rounded-lg"
                src={LenovoPc124}
                width={120}
                // height={200}
                quality={75} // default is 75
                alt="Picture of banner"
                />
                {/* /////////// */}
                {/* // Shop Name */}
                <h1 className=''>XYZ Shop</h1>
                {/* ml-[80px] mt-3 */}
                {/* // offline Shop Address Logo And Details  */}
                <div className='flex'>
                    <MdOutlineLocationCity  className=''/>
                    {/* ml-[80px] mt-1 mr-2 */}
                    <h1>location Details</h1> 
                    </div>
                    
                    {/* // google map link Logo And Details  */}
                    <div className='flex'>
                    <FaMapLocationDot className=''/>
                    {/* ml-[80px]  mt-1 mr-2 */}
                      Click this link 
                      <a target='_blank' href=''><FaLink  className='mt-1 ml-2'/></a>
                    
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
        <SubNavbarOfSellerProfile/>
        
    </>
    
  )
}

