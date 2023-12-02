import {useEffect, useState} from 'react'
import { FaAlignJustify } from "react-icons/fa";
import Link from "next/link";
import Nav from '../../../../layout/Nav.js';
import { MdLogin, MdNightlight } from "react-icons/md";

export default function SubNavbarOfProductDetails() {
//   const [theme, setTheme] = useState(null);
// const user = null;


  return (
    <>
        <div className="h-14 w-full bg-navbarColorGray  flex justify-center content-center mt-4">
        {/* grid grid-cols-12 z-50 fixed*/}
            
            
            <div className=" col-span-7   xl:col-span-8 w-full flex flex-nowrap  justify-center h-10  mt-3  relative">
            {/* xl:ml-56 lg:ml-[-20px] md:ml-[-120px] sm:ml-[-100px] h-10 relative*/}
                <Nav path="/product/@productId" styleProps="group-hover:w-10 text-PureWhite">
                    Specification
                </Nav>
                
                <Nav
                    path="/product/@productId/review"
                    styleProps="group-hover:w-[50px] text-PureWhite"
                    stylePropsForBtn ="hidden lg:block"
                >
                    Review
                </Nav>
                <Nav path="/product/@productId/blog" styleProps="group-hover:w-10">
                    Blog
                </Nav>
                <Nav path="/product/@productId/youtubeReview" styleProps="group-hover:w-14">
                    Youtube Review
                </Nav>
                <Nav path="/product/@productId/record" styleProps="group-hover:w-10">
                    Pricing Record
                </Nav>
                <Nav path="/product/@productId/faq" styleProps="group-hover:w-24">
                    FAQ
                </Nav>
                {/* <Nav path="/dashboard" styleProps="group-hover:w-20">
                    Blog
                </Nav> */}
                
            </div>
            
        </div>
    </>
);
}

