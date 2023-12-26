import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/layout/mainCategory';
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Banner from '@/component/home/Banner';
import SellerProfile from '@/component/seller/profile/SellerProfile';
import axios from 'axios';

export default function SellerProducts() {
  const router = useRouter();
  const {sellerId} = router.query;
  const [category, setCategory] = useState(null); // from DB
  const [brand, setBrand] = useState(null); // from DB
  const [selectCategories, setSelecteCategories] = useState([]);  // post to DB
  const [selectedCategoriesFromDB, setSelectedCategoriesFromDB] = useState(null); // from DB 
  const [selectedCategoriesId, setSelectedCategoryId] = useState(null);
  const [onlyNonSelectedCategory, setOnlyNonSelectedCategory] = useState(null); 
  useEffect(()=>{
    // ekhane amra category and brand gula DB theke niye ashbo 
    // shegula seller .. tar nijer jonno add korte parbe 

    try{
      const tokenString = localStorage.getItem('authForEcomerce');    
      
      ///////////////////////////////////////////////
      // Database theke seller er jonno selected category gula load korte hobe .. product_category_seller table theke
      // setSelectCategoriesFromDB()
      const getAllSelectedCategoryFromBackEnd = async(token) =>{
        const id = JSON.parse(tokenString).userId;
        const response  = await axios.get( `http://localhost:3000/seller/getAllSelectedCategoryForSeller/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response){
        console.log("reponse from selectedCategory : ", response?.data)
        console.log("reponse from onlyNonSelectedCategory : ", onlyNonSelectedCategory)
        
        setSelectedCategoriesFromDB(response?.data);

        

        const selectedCategoryId = response?.data?.map((category)=>{return category.categoryId.CategoryID});
        //console.log("selectedCategoryId : ",selectedCategoryId);
        setSelectedCategoryId(selectedCategoryId);
      }
      }
      
      // 🔰 getAllSelectedCategoryFromBackEnd(JSON.parse(tokenString).accessToken);

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      const getAllCategoryDataFromBackEnd = async(token) =>{
        
        const id = JSON.parse(tokenString).userId;
        const response  =await  axios.get('http://localhost:3000/seller/getAllCategory',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
    
        if(response){
          //console.log("reponse from category : ", response?.data)
          setCategory(response?.data);
          console.log("reponse from category : ", category)


          // jehetu selected category gulao amader kase ase .. so, amra selected category gula category theke remove kore dibo 


          const nonSelectedCategory = category?.filter((category)=>{return !selectedCategoriesId.includes(category.CategoryID)});
          setOnlyNonSelectedCategory(nonSelectedCategory);
        }
      }

      
      //🔰 getAllCategoryDataFromBackEnd(JSON.parse(tokenString).accessToken);
  

      const getAllBrandDataFromBackEnd = async(token) =>{
        
        const id = JSON.parse(tokenString).userId;
        const response  = await axios.get('http://localhost:3000/seller/getAllBrand',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if(response){
        //console.log("reponse from brand : ", response?.data)
        setBrand(response?.data);
      }
      }

  
      getAllSelectedCategoryFromBackEnd(JSON.parse(tokenString).accessToken);
      getAllCategoryDataFromBackEnd(JSON.parse(tokenString).accessToken);

      getAllBrandDataFromBackEnd(JSON.parse(tokenString).accessToken);
      
      //////////////////////////////////////////////////
      
    }catch(error){
      console.log("error from category and brand useEffect",error)
    }

    
  
    
  },[])

  

  // const handleCategory = (e) => {
  //   if (e.target.checked === true) {
  //       if (e.target.value !== " ") {
  //         setSelecteCategories((prevState) => ({
  //               ...prevState,
  //               [e.target.name]: e.target.value,
                
  //           }));
  //       }
  //       console.log("selected Category if: ",selectCategories);
  //   } else if (e.target.checked === false) {
  //     setSelecteCategories((prevState) => ({
  //           ...prevState,
  //           [e.target.name]: "",
  //       }));
  //       console.log("selected Category elif : ",selectCategories);
  //   }
  // };

  const isChecked = (e) => {
    if (e.target.checked === false) {
        // if (e.target.value !== " ") {
          
        // }
        e.target.checked = true;
        
    } 

    // setSelecteCategories((prevState) => ({
          //       ...prevState,
          //       [e.target.name]: e.target.value,
                
          //   }));

          //console.log("selected Category if: ",selectCategories);
  };


  

  
  const handleCategoryChange = (categoryId) => {
    // Check if the category is already selected
    const isSelected = selectCategories.includes(categoryId);

    // If it's selected, remove it; otherwise, add it to the array
    setSelecteCategories((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleBrand = (e) => {
    if (e.target.checked === true) {
        if (e.target.value !== " ") {
          setSelecteCategories((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
                
            }));
        }
        console.log("selected Category if: ",selectCategories);
    } else if (e.target.checked === false) {
      setSelecteCategories((prevState) => ({
            ...prevState,
            [e.target.name]: "",
        }));
        console.log("selected Category elif : ",selectCategories);
    }
  };

  const handleSelectCategorySubmit = (e) => {

    const tokenString = localStorage.getItem('authForEcomerce');    
    // console.log("🔗 tokenString  🟢 : ", JSON.parse(tokenString).userId );
    const token = JSON.parse(tokenString).accessToken;
      
    e.preventDefault();
    console.log("selected Category : ",selectCategories);
    // axios post korte hobe
    const id = JSON.parse(tokenString).userId;
    // Database e seller er jonno selected category gula post hobe .. product_category_seller table e 
    const response = axios.post(`http://localhost:3000/seller/saveCategory/${id}`,selectCategories,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  }

  const handleCreateCategorySubmit = (e) => {
  }  
  const handleSelectBrandSubmit = (e) => {
  }
  const handleCreateBrandSubmit = (e) => {
  }  

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
                  {/* ////////////////////////////////////////////////// SelectCategorySubmit*/}
                  <form onSubmit={handleSelectCategorySubmit}>

                  {/* <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                      
                      <select id="category" name="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option value="category1">Select A Category</option>
                        {
                          category?.map((category)=>(
                            <option value={category.name}>{category.name}</option>
                          ))
                        }
                      </select>
                  </div> */}
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">X</button>
                    </form>
                  </div>
                  <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add New Category Name</label>
                      <div>
                        {
                          // 🏠🏠🏠🏠🏠category
                          onlyNonSelectedCategory?.map((category)=>(
                            <>
                            
                            <div>
                            {/* <input type='checkbox' id={category.CategoryID} name={category.name} value={category.name} onChange={handleCategory} className='rounded-sm'/> <span>{category.name}</span> */}
                            <input type='checkbox' id={category.CategoryID} 
                            
                            // checked={
                            //   ()=>{
                            //     if(selectedCategoriesId.includes(category.CategoryID)){
                            //       console.log(category.CategoryID)
                            //       return true;
                            //     }else{
                            //       console.log(category.CategoryID)
                            //       return false;
                            //     }
                                
                            //   }
                               
                            // }
                            
                            name={category.name} value={category.CategoryID} onChange={() => handleCategoryChange(category.CategoryID)} className='rounded-sm'/> <span>{category.name}</span>
                            
                            </div>
                            
                            </>
                            
                          ))
                        }
                        
                      </div>
                      <button type="submit" class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  
                    </div>
                    
                    </form> 
                    {/* ///////////////////////////////////////////////////////////////// CreateCategorySubmit */}
                    <form onSubmit={handleCreateCategorySubmit}>
                      {/* // This is for admin  */}
                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add New Category Name</label>
                      <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write category name here..." required/>
                    </div>
                    
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  </form> 
                  {/* //////////////////////////CategoryForm End//////////////////////// */}
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>

              {/* // ekhane amra Category gula Database theke show korbo  ---------------------------------------- */}
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
                  {
                    selectedCategoriesFromDB?.map((category)=>(
                      <>
                      <tr>
                        <th>id {category.categoryId.CategoryID}</th> 
                        <th>{category.categoryId.name}</th> 
                        <th>id {category.categoryId.CategoryID}</th> 
                      </tr>
                      </>
                    ))
                  }
                  {/* <tr>
                    <th>id 1</th> 
                    <th>category name 1</th> 
                    <th>id 1</th> 
                  </tr> */}
                  
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

            {/* ////////////////
            //////////////
            /////////////
            ///////////////
            //////////////// */}

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>Add Brand</button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  {/* ////////////////////////////////////////////////// */}
                  {/* ////////////////////////////////////////////////// SelectBrandSubmit*/}
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">X</button>
                    </form>
                  </div>
                  <form onSubmit={handleSelectBrandSubmit}>

                  {/* <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                      
                      <select id="category" name="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                      <option value="category1">Select A Category</option>
                        {
                          category?.map((category)=>(
                            <option value={category.name}>{category.name}</option>
                          ))
                        }
                      </select>
                  </div> */}

                  <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add New Brand Name</label>
                      <div>
                        {
                          brand?.map((brand)=>(
                            <>
                            
                            <div>
                            <input type='checkbox' id={brand.Name} name={brand.Name} value={brand.Name} onChange={handleBrand} className='rounded-sm'/> <span>{brand.Name}</span>
                            </div>
                            
                            </>
                            
                          ))
                        }
                        
                      </div>
                      <button type="submit" class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  
                    </div>
                    
                    </form> 
                    {/* ///////////////////////////////////////////////////////////////// CreateBrandSubmit */}
                    <form onSubmit={handleCreateBrandSubmit}>
                      {/* // This is for admin  */}
                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add New Brand Name</label>
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

