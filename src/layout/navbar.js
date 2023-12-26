import {useEffect, useState} from 'react'
import { FaAlignJustify } from "react-icons/fa";
import Link from "next/link";
import Nav from './Nav';
import { MdLogin, MdNightlight } from "react-icons/md";
import logo from "../../public/assets/icons/home/logo.png";
import mohammad from "../../public/images/navbar/mohammad.jpg";
import Image from 'next/image';
import api from '@/utils/api';

import { useRouter } from 'next/router';
import { useAuth } from '@/utils/authcontext';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

export default function Navbar() {
const { getUser, checkUser } = useAuth();
// const user2 = useAuth();
  const [theme, setTheme] = useState(null);
 // const [user, setUser] = useState(null);
 const [user1, setUser1] = useState(null);  // user1 is the user from localstorage from this page
 const [data, setData] = useState(null); 
  const router = useRouter();

  //const {user} = user2;


    useEffect(() => {
        //console.log("authcontext's user from navbar.js🔰🔰🔰🔰", user);
        //const tokenString = localStorage.getItem('authForEcomerce');
        //setUser1(JSON.parse(tokenString));  


        // ekhon amra context er chekUser function ta call korbo .. jeta return korbe 
        // localstorage e accesstoken set kora ase kina ..
        // thakle true return korbe ..  

        // jodi true return kore .. taile context er user er value ekhane e use korbo 
        const details = checkUser();
        if(details){
            // true return korle .. 
            // user ke user1 er moddhe assign kore dibo .. user kintu ashbe context theke
            setUser1(details);

            // pull users image from database .. and save it to useState 

        }
    },[])

    useEffect(() => {
        console.log("user1 from getUsersInfo navbar.js 🔰🔰 ",user1)
    },[])

//   async function getUsersInfo(){
//     console.log("user1 from getUsersInfo navbar.js 🔰🔰 ",user1)
//     try{
//         console.log("user1?.userId : ", user1?.userId)
//       const response = await api.get(14);
//       setData(response.data);
    
//     }catch(error){
//       console.log("error:", error);
//     }
//   }

//const user1 = null;
  const logout = () => {
//    setUser(null);
    setUser1(null);
    //dispatch(userLoggedOut()); // AuthSlice er userLoggedOut Action ta dispatch kore dilam ..
    localStorage.clear(); // localStorage tao clear kore dite hobe ..
    //console.log("userLoggedOut is dispatched and localstorage is cleared");
};

  useEffect(() => {
    // to check prefered theme
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}, []);

const handleThemeSwitch = () => {
  console.log(
      "-------------------------------------------------- btn clicked "
  );
  setTheme(theme === "dark" ? "Light" : "dark");
};

useEffect(() => {
  if (theme === "dark") {
      document.documentElement.classList.add("dark");
  } else {
      document.documentElement.classList.remove("dark");
  }
  // jokhon e theme er value change hobe .. tokhon e eita ghotbe ..
}, [theme]);

  return (
    <>
        <div className="h-14 w-full bg-navbarColorGray grid grid-cols-12 fixed z-50">
            {/* bg-slate-600 */}
            <div class="col-span-1 sm:col-span-3 xl:col-span-3 w-[210px] h-14 rounded-full group flex">
                <Link href="/" className=" h-12 w-10 rounded-full ml-4 mt-1  hover:ring-4 hover:ring-PrimaryColorDark">
                    

                <Image
                    src={logo}
                    width={40}
                    // height={200}
                    className='rounded-full'
                    quality={75} // default is 75
                    alt="Logo"
                />
                </Link>

                <div className="hidden md:block h-8 w-[0px] rounded-md ml-2 mt-3 pl-2 pr-2 pt-1 pb-1 invisible group-hover:w-36 group-hover:visible transition-all duration-1000 hover:duration-0 delay-0 bg-PrimaryColorLight  ">
                    <h2 className=" text-orange leading-3 text-sm w-36 invisible group-hover:visible transition-all duration-1000 hover:delay-400 ">
                        ABC E-Commerce
                    </h2>
                </div>
            </div>
            {/*
            2xl:px-[30%] -> normal -> 100% 
            xl:px-[25%] -> 120% - 150% 
            lg:px-[20%] ->  160px - 180% - 230% 
            md:px-[10%]
            sm:px-[1%] -> */}
            <div className=" col-span-0">

            </div>
            <div className=" col-span-7   xl:col-span-8 w-full flex flex-nowrap xl:ml-56 lg:ml-[-20px] md:ml-[-120px] sm:ml-[-100px] mt-3 h-10 relative">
            {/* path="/" */}
                <Nav path="/" styleProps="group-hover:w-10 text-PureWhite">
                    Home
                </Nav>
                
                <Nav
                    path="/about"
                    styleProps="group-hover:w-[50px] text-PureWhite"
                    stylePropsForBtn ="hidden lg:block"
                >
                    New Arrivals
                </Nav>
                <Nav path="/projects" styleProps="group-hover:w-14">
                    Offers
                </Nav>
                <Nav path="/timeline" styleProps="group-hover:w-14">
                    Contact
                </Nav>
                <Nav path="/story" styleProps="group-hover:w-10">
                    About
                </Nav>
                <Nav path="/achievements" styleProps="group-hover:w-24">
                    FAQ
                </Nav>
                <Nav path="/dashboard" styleProps="group-hover:w-20">
                    Blog
                </Nav>
                {!user1?.userId  && (
                    <>
                    <div className="dropdown">
                    <button  tabIndex={0} className="text-orange group w-auto ml-3 h-7 leading-6 rounded-md pl-2 pr-2 bg-PureWhite hover:shadow hover:shadow-homeColor">
                    Login
                    <span>
                        {" "}
                        <div
                            className={` w-0 h-0.5 absolute bottom-1 rounded-xl group-hover:w-10  bg-PureWhite hover:invisible  group-hover:visible transition-all duration-1000 hover:duration-75 delay-0`}
                        ></div>
                    </span>
                </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <li><a href='/seller/login'>Seller</a></li> */}
                        <li><a href='/seller/login'>Seller</a></li>
                        
                        <li><a href='/buyer/login'>Buyer</a></li>
                        <li><a href='/admin/login'>Admin</a></li>
                    </ul>
                </div>
                    </>
                )}
                
                <div>
                <li>
                    {/* <Image
                    src={logo}
                    width={40}
                    
                    className='rounded-full ml-3'
                    quality={75}
                    alt="Image Can not be shown from navbar.js"
                    /> */}

            <Image
        // productImage
                src={`http://localhost:3000/seller/getLoggedInUserImage/?imageName=1703081540829pc.jpg`}
                width={50}
                 height={50}
                className='rounded-md hidden xl:block'
                style={{width:"50px", height:"50px"}}
                quality={75} // default is 75
                alt="Picture of banner"
            />
                </li>
                    
                        
                    
            </div>
            <div>
                
                <Link href={`/seller/${user1?.userId}`} className=' w-auto ml-3 h-7  leading-6 rounded-sm text-PureWhite pl-2 pr-2  hover:border-b-2'>

                        <span >
                        {user1?.user?.userName}
                        </span>
                    
                </Link>
            </div>
            {/* // logout logo  */}

            {user1?.userId  && (
                <Nav  path="/" styleProps="group-hover:w-20">
                    
                    <span onClick={logout}>
                    Logout
                    </span>
                    
                </Nav>
            )}

            
            </div>
            {/*
            2xl:px-[30%] -> normal -> 100% 
            xl:px-[25%] -> 120% - 150% 
            lg:px-[20%] ->  160px - 180% - 230% 
            md:px-[10%]
            sm:px-[1%] -> */}

            
        </div>
    </>
);
}

