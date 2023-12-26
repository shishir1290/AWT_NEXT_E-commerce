import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import LenovoPc124 from '../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import ProductProfileInfo from '@/component/common/productDetails/productDetailsProfile/ProductProfileInfo';
import Specifications from '@/component/common/specification/SpecificationCategory';
import axios from 'axios';
import SpecificationCategory from '@/component/common/specification/SpecificationCategory';

export default function Profile() {
  const router = useRouter();
  const {productId} = router.query;

  const [productDetails, setProductDetails] = useState(null); //{}
  const [productID, setProductID] = useState(null);

  const [specification, setSpecification ] = useState([
      {
        specificationCategoryId : 1,
        specificationCategoryName : "Overview",
        specificationCategory: [
          {
            id: 1,
            title : "device name",
            details: "Apple Pro Max",
          },
          {
            id: 2,
            title : "device name 2",
            details: "Apple Pro Max 2",
          }
        ]
      },
      {
        specificationCategoryId : 2,
        specificationCategoryName : "Display",
        specificationCategory: [
          {
            id: 1,
            title : "Display",
            details: "22 inch display amoled",
          }
        ]
      },
      
    ]
  )

  const [specificationForm, setSpecificationForm ] = useState([
    {
      specificationCategoryId : 1,
      specificationCategoryName : "Overview",
      specificationCategory: [
        {
          id: 1,
          title : "device name",
          details: "Apple Pro Max",
        },
        
      ]
    },
    
    
  ]
)

   // console.log("🟢1🟢", typeof productId);
  
  useEffect(()=>{
    const {productId} = router.query;
    setProductID(productId);
    console.log("specificationForm from first render :", specificationForm)
  },[productId])
    


useEffect(() => {
    
    getProductDetailsFromDB();
  }, [])


  async function getProductDetailsFromDB(){

    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;
    const {productId} = router.query;
    // console.log(" type of ::::", typeof productId)

    const response  = await axios.get(`http://localhost:3000/seller/getAProductsDetailsById/${productId}`,
    {
      headers: {
         Authorization: `Bearer ${token}`,
      },
    }
    );
    if(response.data){
      // console.log("🏠🏠",response.data);
      setProductDetails(response.data);
    }
  }

  const onChange = (e) => {
    // onChange e validation korte hobe .. 
    console.log(e.target.name, " : ", e.target.value)
    setSpecificationForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // ei ta xoss way to play with form data
    }));
};

  const handleSubmitNewSpecification = () => {
    console.log("SpecificationForm from handle submit 🔰 ", specificationForm)
  } 

  const handleAddNewTitleAndDetails = (e, categoryId) => {
    e.preventDefault();
    const newSpecificationForm = [...specificationForm];
    const categoryIndex = newSpecificationForm.findIndex(
      (category) => category.specificationCategoryId === categoryId
    );

    if (categoryIndex !== -1) {
      const newTitleAndDetails = {
        id: newSpecificationForm[categoryIndex].specificationCategory.length + 1,
        title: 'New Title',
        details: 'New Details',
      };

      newSpecificationForm[categoryIndex].specificationCategory.push(
        newTitleAndDetails
      );
      setSpecificationForm(newSpecificationForm);
    }
  };

  const handleAddNewSpecificationCategory = (e) => {
    e.preventDefault();
    const newSpecificationForm = [...specificationForm];
    const newCategory = {
      specificationCategoryId: specificationForm.length + 1,
      specificationCategoryName: 'New Category',
      specificationCategory: [],
    };

    newSpecificationForm.push(newCategory);
    setSpecificationForm(newSpecificationForm);
  };
  

  
  const handleRemoveLastSpecificationCategory = (e) => {
    e.preventDefault();
    const newSpecificationForm = [...specificationForm];
    newSpecificationForm.pop();
    setSpecificationForm(newSpecificationForm);
  };

  const handleRemoveLastTitleAndDetails = (e, categoryId) => {
    e.preventDefault();
    const newSpecificationForm = [...specificationForm];
    const categoryIndex = newSpecificationForm.findIndex(
      (category) => category.specificationCategoryId === categoryId
    );

    if (categoryIndex !== -1) {
      newSpecificationForm[categoryIndex].specificationCategory.pop();
      setSpecificationForm(newSpecificationForm);
    }
  };


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


        {/* // Add Specification Button .... its a modal actually -------------------------------------------------------------------------- Start */}
        {/* <button className='btn'>Add Specification</button> */}

        <button className="btn m-3" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Specification Category</button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">X</button>
                      </form>
                    </div>
                  {/* ////////////////////////////////////////////////// */}
                  
                  <form className="modal-action flex flex-col"  noValidate method="dialog" onSubmit={handleSubmitNewSpecification}>
                    {/* <h1 className="text-xl font-normal text-gray-900 dark:text-white">Add New Specification Category</h1> */}


            {

                <div>
                {specificationForm.map((category) => (
                  <div key={category.specificationCategoryId}>
                    {/* ............................................................ */}

                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specification Category Name - specificationCategoryId {category.specificationCategoryId}</label>
                      <input onChange={onChange} value={category.specificationCategoryName} type="name" id="specificationCategoryName" name='specificationCategoryName' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write specification category name here..." />
                    </div>

                    {/* ............................................................... */}
                    {/* <h2>{category.specificationCategoryName}</h2> */}
                    <ul>
                      {category.specificationCategory.map((spec, innerIndex) => (
                        <>
                        {/* <li key={spec.id}>
                          {spec.title} - {spec.details}
                        </li> */}
                        

                        {/* key={innerIndex} */}
                        <div style={{marginLeft:"70px"}}  key={spec.id}>
                                <div class="mb-6">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input onChange={onChange} value={`${spec.title} - ${spec.id} - ${innerIndex}`} type="name"  name='title' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product title here..." />
                              </div> 
                              
                              
                              <div class="mb-6">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                                <input  onChange={onChange} value={`${spec.details} - ${spec.id} - ${innerIndex}`} type="name"  name='details' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product details here..."  />
                              </div> 
                          </div>
                        
                        </>
                        

                      ))}
                    </ul>
                    <button
                      onClick={(e) =>
                        handleAddNewTitleAndDetails(e,category.specificationCategoryId)
                      }
                    >
                      Add New Title And Details
                    </button>
                    <button
                      onClick={(e) => handleRemoveLastTitleAndDetails(e, category.specificationCategoryId)}
                    >
                      Remove Last Title And Details
                    </button>
                  </div>
                ))}
                <button onClick={handleAddNewSpecificationCategory}>
                  Add New Specification Category
                </button>
                <button onClick={handleRemoveLastSpecificationCategory}>
                  Remove Last Specification Category
                </button>
                </div>
                
            }

                    <button  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
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

        {/* // Add Specification Button .... its a modal actually -------------------------------------------------------------------------- End */}


        <div className=''>


            {/* // ekhane loop chalaite hobe specificationCategories er upor  */}

            {
              specification?.map((specificaitonCategory, index) => (
                <>
                  <SpecificationCategory key={index} specificaitonCategory={specificaitonCategory}/>
                </>
              ))
            }


              {/* <SpecificationCategory/> */}
              {/* <Specifications/>
              <Specifications/> */}
        </div>
      </div> 
    </>
    
  )
}

// export async function getServerSideProps(params) {
//  // const {productId} = params.query;
//  console.log("params 🏠🏠🏠: ", params)
//   //console.log("🟢from getServerSideProps🟢 ", productId);
//   return {
//     props: {
//       //productId, // props: {productId},
//     },
//   }
// }