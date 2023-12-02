import {useEffect, useState} from 'react'
import { FaAlignJustify } from "react-icons/fa";
import Link from "next/link";
import Nav from '../../../layout/Nav.js';
import { MdLogin, MdNightlight } from "react-icons/md";

export default function SubNavbarOfSellerProfile() {
//   const [theme, setTheme] = useState(null);
// const user = null;


  return (
    <>
        <div className="h-14 w-full bg-navbarColorGray  flex justify-center content-center mt-4">
        {/* grid grid-cols-12 z-50 fixed*/}
            
            
            <div className=" col-span-7   xl:col-span-8 w-full flex flex-nowrap  justify-center h-10  mt-3  relative">
            {/* xl:ml-56 lg:ml-[-20px] md:ml-[-120px] sm:ml-[-100px] h-10 relative*/}
                <Nav path="/seller/1" styleProps="group-hover:w-10 text-PureWhite">
                    Personal Details
                </Nav>
                
                <Nav
                    path="/seller/1/products"
                    styleProps="group-hover:w-[50px] text-PureWhite"
                    stylePropsForBtn ="hidden lg:block"
                >
                    Products
                </Nav>
                <Nav path="/seller/1/categoryAndBrand" styleProps="group-hover:w-10">
                    Category And Brands
                </Nav>
                <Nav path="/seller/1/statistics" styleProps="group-hover:w-14">
                    Statistics
                </Nav>
                <Nav path="/seller/1/review" styleProps="group-hover:w-10">
                    Review
                </Nav>
                <Nav path="/seller/1/conversation" styleProps="group-hover:w-24">
                    Conversation
                </Nav>
                {/* <Nav path="/dashboard" styleProps="group-hover:w-20">
                    Blog
                </Nav> */}
                
            </div>
            
        </div>
    </>
);
}

