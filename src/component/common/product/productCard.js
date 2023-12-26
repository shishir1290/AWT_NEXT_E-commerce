import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";


export default function ProductCard({product,sellerID}) {
  const router = useRouter();
  //const {productName, productImage} = props;

  //console.log("=========",product)

  const {id, name, price, productImage} = product;
  const {sellerId} = sellerID;
  const handleDelete = async(productId) => {
    const tokenString = localStorage.getItem('authForEcomerce');    
    const token = JSON.parse(tokenString).accessToken;
      

     // fetch er jaygay axios use korbo 
     const response  =await axios.delete(`http://localhost:3000/seller/product/deleteProduct/${productId}`,
     {
        headers: {
          Authorization: `Bearer ${token}`,
        }
     })
     if(response.data == "Successful"){
      router.push(`/seller/${sellerId}/products`) // seller er id dynamically pass korte hobe
     }
  }

  // const handleGetProductImage = async (product){

  // }
  return (
    <>
    <div  className=" border-2 rounded-lg" style={{width: "auto"}}>
      {/* //////////////////////////////////////////////////////// */}
      
      <div className="card w-96 bg-base-100 shadow-xl rounded-lg" style={{width: "290px", height:"400px"}}>
        <figure>
        {/* maxHeight: "250px"  */}
        <div className='rounded-lg object-fill' style={{height:"210px" , overflowBlock: "hidden"}}>
        <Image
        // productImage
                src={`http://localhost:3000/seller/getProductImage/?imageName=1699863821382IMG20230702114256.jpg`}
                width={500}
                height={500}
                quality={75} // default is 75
                alt="Picture of banner"
            />
            </div>
        </figure>
        <div className="card-body">
            <h5 className="card-title flex justify-between" style={{width:"auto",height:"40px", fontSize:"18px"}} >
              {/* , display:"flex", justifyContent : "space-between" */}
              <Link className='ml-3' href={`/product/[productId]`} as={`/product/${id}`} >
              {name}
              </Link>
              {/* <a   target="_blank" href={`/product/${id}`}>
                
                {name}
              </a> */}
              {/* // ekhane amra dropdown button ta add korte pari */}
                {/* //////////////////////// */}
                <div className="dropdown">
                    <button tabIndex={0} className="text-orange group w-auto ml-3 h-7 leading-6 rounded-md pl-2 pr-2 bg-PrimaryColorDarkHover hover:bg-PureWhite hover:shadow hover:shadow-homeColor">
                    {/* button icon  */}
                    <HiOutlineDotsHorizontal />
                    
                </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {/* if (Session["userType"] == "Seller" && product.sellerId == Convert.ToInt32(Session["userid"])) */}
                             {/* { */}
                                 <li><a className="dropdown-item" href={`Product/updateOneProductDetails/${id}`}>Update Details</a></li>
                                 {/* <li><a className="dropdown-item text-danger" href={`Product/deleteProduct/${id}`}>Delete</a></li> */}
                                 <li> <button onClick={() => handleDelete(id)}>Delete</button></li> {/* // handleDelete er product id ta pass korte hobe */}
                                 {/* 
                                            Delete Button er onClick e method thakbe .. sheta delete korbe apatoto
                                 🔰 Delete button e click korle ekta Modal open hobe ... jeta te delete er confirmation message thakbe
                                 and delete button thakbe */}

                             {/* } */}
                             {/* if (Session["userType"] == "User") */}
                             {/* { */}
                                 <li><a className="dropdown-item" href="#">Add To Cart</a></li>
                                 <li><a className="dropdown-item" href="#">Add To WishList</a></li>
                             {/* } */}

                             <li><hr className="dropdown-divider"/></li>
                             <li><a className="dropdown-item" href="User/addToCart/@product.id">Add To Cart</a></li>

                    </ul>
                </div>
            
                {/* /////////////////////// */}
            </h5>
         {/* //////////////////////////////////////////////////////////////////////// */}

        <div className='w-auto h-80 flex flex-col  gap-y-12 ' style={{marginTop: "15%"}} >


         <div className="flex justify-between px-4">
                 {/* // for price and status */}

                     <div className="flex">
                         <h6>৳</h6>
                         <h6>{price} &nbsp;&nbsp;</h6>
                         &nbsp;
                         &nbsp;
                         &nbsp;
                         &nbsp;
                     </div>
                     <div className='flex '>
                        {/* // if product has any status .. show here ..  */}
                        <div className="bg-orange-500" > Trending </div>
                        <div className='ml-2'>Limited Stock</div>
                     </div>
                 
         </div>

         {/* style={{marginTop: "8px"}} */}
         {/* relative top-[9px]  */}
        
          <div style={{marginTop: "18px"}} className=' flex justify-evenly content-center gap-4 '  >
            {/* // logged in seller er jonno ei button gula show korbe na  */}
              <button className='btn bg-PrimaryColorDarkHover hover:bg-orange-300'> Add To cart</button>
              <button className='btn'>Place Order</button>
          </div>
        
          </div>
             

            {/* // /////////////////////////////////////////////////////////////////// */}
        </div>
      </div>


    
    




      
      

      {/* ////////////////////////////////////////////////////////////// */}
    </div>

    </>
  )
}

