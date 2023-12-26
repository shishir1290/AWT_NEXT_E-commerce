import React from 'react'
import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'

import LenovoPc124 from '../../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';

export default function ProductProfileInfo({productDetails}) {
  
  if(productDetails != null){
    const {id, name, details, productImage, rating, price, availableQuantity, lowestQuantityToStock, createdAt} = productDetails ;
    //details
    //productImage
    //rating
    // availableQuantity
    // lowestQuantityToStock
    // createdAt
  }

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
                    <h1>{productDetails?.name}</h1>
                      
                  </div>
                  <div class='pt-[10px] '>
                  {productDetails?.category} {productDetails?.brand}
                      {/* Category Name, Brand Name ...  */}
                  </div>
                  
                  
                  <div class='pt-[10px] '>
                      {/* Product Price  */}
                      {productDetails?.price}
                  </div>

                  <div class='pt-[10px] '>
                      Product Tags...  
                  </div>
                  <div class='pt-[10px] flex  '>
                      <button className='btn '>Add To Cart</button>
                      <button className='btn ml-3'>Place Order</button>
                      {/* Add To Cart , Place Order Buttons ...  */}
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
