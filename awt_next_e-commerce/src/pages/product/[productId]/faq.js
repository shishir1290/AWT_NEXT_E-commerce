import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React from 'react'

import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import ProductProfileInfo from '@/component/common/productDetails/productDetailsProfile/ProductProfileInfo';
import Blogs from '@/component/common/productDetails/blog/Blogs';
import FAQ from '@/component/common/faq/FAQ';

export default function faq() {
  const items = [
    { title: 'Section 1', content: 'Content for section 1.' },
    { title: 'Section 2', content: 'Content for section 2.' },
    { title: 'Section 3', content: 'Content for section 3.' },
    // Add more sections as needed
  ];
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


        <div className='p-10 '>
        {/* mt-24 mx-auto*/}
              <FAQ items={items} />
        </div>
      </div> 
    </>
    
  )
}
