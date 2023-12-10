import React from 'react'
import ProductCard from './productCard'
import LenovoPc123 from '../../../../public/images/Products/LenovoPc123.jpg';
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';

import TpLinkRouter556 from '../../../../public/images/Products/TpLinkRouter556.jpg';
import TpLinkRouter560 from '../../../../public/images/Products/TpLinkRouter560.jpg';


export default function Products({brandName}) {
  return (
    <>
    <div className='border-y-2'>
      <div className='text-start text-center rounded-t'  style={{marginTop:"20px", backgroundColor: "royalblue", width:"140px",  border:"1px solid red", marginBottom:"2px", marginLeft: "30px"}}>
        {/* // custom deep green color  */}
        {/* Product Category Name  */}
        {brandName}
      </div>
      <div className='flex p-10  gap-3 justify-start' style={{width: "100%", overflowBlock:"hidden" }}> 
      {/* justify-center content-center lg:justify-between lg:content-start */}
        {/* <ProductCard productName="PC" productImage = {LenovoPc123}/>
        <ProductCard productName="PC" productImage = {LenovoPc124}/>
        <ProductCard productName="PC" productImage = {TpLinkRouter556}/>
        <ProductCard productName="PC" productImage = {TpLinkRouter560}/> */}
        
      </div>
    </div>
    </>
  )
}
