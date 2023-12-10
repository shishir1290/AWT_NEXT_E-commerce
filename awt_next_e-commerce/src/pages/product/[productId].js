import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import LenovoPc124 from '../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import ProductProfileInfo from '@/component/common/productDetails/productDetailsProfile/ProductProfileInfo';
import Specifications from '@/component/common/specification/Specifications';
import axios from 'axios';

export default function Profile(param) {
  const router = useRouter();
  //const {productId} = router.query;

  const {productId} = param;

  // const {productId} = router.params();
  const [productDetails, setProductDetails] = useState(null); //{}
  const [productID, setProductID] = useState(null);

  // console.log("🟢🟢", productId);
  //console.log(productDetails.name);
  useEffect(()=>{
    console.log("🟢🟢", productId)
    setProductID(productId);
  },[])// productId
    
useEffect(() => {
    

    //const {id, name, details, productImage, rating, price, availableQuantity, lowestQuantityToStock, createdAt} = productDetails ;
  
    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;

    const getProductDetailsFromDB = async(token,productId)=>{
      console.log("product id from getProductDetailsFromDB 2: ",productId, token);
      
      console.log("product id from getProductDetailsFromDB1 : ",productID);
      // const response  = await axios.get(`http://localhost:3000/seller/getAProductsDetailsById/${productId}`,
      // {
      //   headers: {
      //      Authorization: `Bearer ${token}`,
      //   },
      // }
      // );
      // if(response.data){
      //   // state er moddhe set korbo 
      //   console.log("🏠🏠",response.data);
      //   setProductDetails(response.data);
      // }
    }

    getProductDetailsFromDB(token, productId);

    
  }, [productID]) //productId
  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <div className='text-center'>Product Details Page for </div>
    <p>productId :  {productId}</p> */}


      <div className=''>
      {/* min-h-[300vh]  border-2 */}
        <ProductProfileInfo productDetails={productDetails}/>
        {/* // ekhon amra product er subNavbar er design korbo  */}


        <SubNavbarOfProductDetails productId={productId}/>

        <div className=''>
              <Specifications/>
              <Specifications/>
              <Specifications/>
        </div>
      </div> 
    </>
    
  )
}

export async function getServerSideProps(params) {
 // const {productId} = params.query;
 console.log("params 🏠🏠🏠: ", params)
  //console.log("🟢from getServerSideProps🟢 ", productId);
  return {
    props: {
      //productId, // props: {productId},
    },
  }
}