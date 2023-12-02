import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React from 'react'

import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/layout/mainCategory';
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Banner from '@/component/home/Banner';
import SellerProfile from '@/component/seller/profile/SellerProfile';

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
          {/* Category And Brand */}
          {/* // add category button thakbe 
          // add brand button thakbe 

          // category er list database theke load kore show korbe .. 
          // brand er list database theke load kore show korbe ..  */}
          <div className='flex gap-3 p-3'>
            

            {/* //////////////////////////////////////////////////////////////////////// */}
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Category</button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  {/* ////////////////////////////////////////////////// */}
                  <form>
                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                      <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write category name here..." required/>
                    </div>
                    
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  </form>
                  {/* ////////////////////////////////////////////////// */}
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>

              {/* // ekhane amra Category gula Database theke show korbo  */}



              <div className="overflow-x-auto w-96 rounded-md">
              <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th></th> 
                    <td>Name</td> 
                    <th></th> 
                  </tr>
                </thead> 
                <tbody>
                  <tr>
                    <th>id 1</th> 
                    <th>category name 1</th> 
                    <th>id 1</th> 
                  </tr>
                  
                </tbody> 
                <tfoot>
                  <tr>
                    <th></th> 
                    <td>Name</td> 
                    <th></th> 
                  </tr>
                </tfoot>
              </table>
            </div>

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>Add Brand</button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  {/* ////////////////////////////////////////////////// */}
                  <form>
                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Name</label>
                      <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write brand name here..." required/>
                    </div>
                    
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  </form>
                  {/* ////////////////////////////////////////////////// */}
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>

              {/* // ekhane amra Brand gula Database theke show korbo  */}
              <div className="overflow-x-auto w-96 rounded-md">
              <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                  <tr>
                    <th></th> 
                    <td>Name</td> 
                    <th></th> 
                  </tr>
                </thead> 
                <tbody>
                  <tr>
                    <th>id 1</th> 
                    <th>brand name 1</th> 
                    <th>id 1</th> 
                  </tr>
                  
                </tbody> 
                <tfoot>
                  <tr>
                    <th></th> 
                    <td>Name</td> 
                    <th></th> 
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* //////////////////////////////////////////////////////////////////////// */}
            
          </div>

        </div>
      </div> 
    </>
    
  )
}

