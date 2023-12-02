import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React from 'react'

import LenovoPc124 from '../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import ProductProfileInfo from '@/component/common/productDetails/productDetailsProfile/ProductProfileInfo';
import Specifications from '@/component/common/specification/Specifications';

export default function Profile() {
  const router = useRouter();
  const {productId} = router.query;
  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <div className='text-center'>Product Details Page for </div>
    <p>productId :  {productId}</p> */}


      <div className=''>
      {/* min-h-[300vh]  border-2 */}
        <ProductProfileInfo/>
        {/* // ekhon amra product er subNavbar er design korbo  */}


        <SubNavbarOfProductDetails/>


        <div className=''>
              <Specifications/>
              <Specifications/>
              <Specifications/>
        </div>
      </div> 
    </>
    
  )
}
