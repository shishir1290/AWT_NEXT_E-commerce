import React from 'react'
import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'

import LenovoPc124 from '../../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';

export default function ProductProfileInfo() {
  return (
    <div className="grid grid-cols-12 ">
            
            <div class="lg:col-span-3  ">
              {/* flex justify-start xxl:justify-end */}
              <div className='pt-[70px]   flex justify-center content-center'>
                {/* Main Category */}
                {/* // product image  */}
                <Image
                src={LenovoPc124}
                className='rounded-lg'
                width={200}
                // height={200}
                quality={75} // default is 75
                alt="Picture of banner"
                />

              </div>
              
            </div>
            
            <div className="col-span-9 lg:col-span-6 ">
                  <div className='pt-[70px] '>
                    {/* Banner */}
                  </div>
                    
                  <div class='pt-[10px] '>
                    <h1>Product Name </h1>
                      
                  </div>
                  <div class='pt-[10px] '>
                      Category Name, Brand Name ... 
                  </div>
                  
                  
                  <div class='pt-[10px] '>
                      Product Price 
                  </div>

                  <div class='pt-[10px] '>
                      Product Tags...  
                  </div>
                  <div class='pt-[10px] '>
                      Add To Cart , Place Order Buttons ... 
                  </div>
            </div>
            
            <div class="col-span-0 hidden  lg:block lg:col-span-3  ">
              <div className='pt-[70px] '>
                {/* Main Category */}
              </div>
            </div>
        </div>
  )
}
