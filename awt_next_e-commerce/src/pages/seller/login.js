//rfce
import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/authcontext";

import { useRouter } from 'next/router';
import api from "@/utils/api";
import axios from "axios";

// Link ta o niye ashte hobe .. // ekta Error page design korte hobe .. shetao niye ashte hobe ..
function Login() {
    
    const router = useRouter();
    // component load hoile jeno user field e focus kore .. shejonno amra useRef use korte pari ..
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login } = useAuth();
    
    const [error, setError] = useState("");

    const { email, password } = formData; 

    // useEffect(()=>{
    //     // ekhane ki amra 
    //     // state er email and password er moddhe e.target[].value set korte hobe
    // },[])


    
    

    
    const onChange = (e) => {
        // onChange e validation korte hobe .. 
        if(e.target.name === "email"){
            if(!e.target.value){
                setError("Email Can not be empty");
            }
            else if (!e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                setError("Please provide valid email format");
                
            }else{
                setError("");
            }
        }

        if(e.target.name === "password"){
            if(!e.target.value){
                setError("Password Can not be empty");
                
            }
            else if (e.target.value < 4) {
                setError("Password must be at least 4 characters");
            }else{
                setError("");
            }
        }

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value, // ei ta xoss way to play with form data
        }));
    };

    // Dave Gray eta ke asynchronous function boltese ... ⏳ 28:08
    const  handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        if (!e.target[0].value && !e.target[1].value) {
            console.log(e.target[0].value  + " " + e.target[1].value)
            setError("Email And Password Can not be empty");
            return;
        }
        if (!e.target[0].value) {
            console.log(e.target[0].value  + " " + e.target[1].value)
            setError("Email Can not be empty");
            return;
        }
        if (!e.target[1].value) {
            console.log(e.target[1].value  + " " + e.target[1].value)
            setError("Password Can not be empty");
            return;
        }
        if (!e.target[1].value.length > 3) {
            setError("Password must be at least 4 characters");
            return;
        }
        // i need regular expression to check email validation ..
        if (!e.target[0].value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setError("Please provide valid email format");
            return;
        }
        
        setError("");

       

        try{ 
            
            const response = await axios.post('http://localhost:3000/seller/sellerLoginJWT',{
              //sellerEmailAddress: formData.email,
              // sellerPassword: formData.password
              sellerEmailAddress : e.target[0].value,
              sellerPassword : e.target[1].value
            }
            
            );
            if(response){
               
              const user = {
                userId: response.data.userId,
                userName: response.data.userName,
                userEmailAddress: response.data.userEmailAddress,
                accessToken: response.data.access_token,
                };

                //console.log("user from back-end : ", user)

                const loggedInUser = {
                    accessToken: response.data.access_token,
                    userId : response.data.userId,
                }

                //console.log("loggedInUser from back-end : ", loggedInUser)
                
                localStorage.setItem(
                    "authForEcomerce",
                    JSON.stringify({
                        accessToken: response.data.access_token,
                        user: user,
                        userId: user.userId,

                    })
                );

                 // ekhon amra session e access token and userId rekhe dibo .. 

                // login korar shomoy e for the first time cookie check korbo .. 
                // cookie thakle profile page e redirect kore dibo ... 

                
                login(user);
                
                router.push(user.userId);
                // '/seller/'+



               


            }
          }catch (error) {
            console.error("Login failed:", error.message);
            setError("Credential is Wrong");
            
          }

    };

    return (
        <>
            <div class="w-auto h-[700px] flex justify-center ">
                <div class="h-[450px] w-[400px] sm:w-[500px]  xl-w-auto box-border border-2 rounded-xl bg-cardBG mt-[150px] flex justify-center">
                    <form
                        method="post"
                        class=" h-auto w-auto my-auto"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <h1 className="py-4 text-2xl text-center ">
                            Login Form For Seller
                        </h1>
                        {/* <textarea
                            type="text"
                            placeholder=""
                            class="p-2 w-[450px] resize-y"
                        /> */}
                        <div className="ml-14">
                            <h1 className="py-2 text-lg  mt-11 text-left ">
                                Email :
                            </h1>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                class=" block  p-2.5   w-[365px]   bg-gray-700 border border-gray-600 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                // resize-y
                                placeholder="Type email here..."
                                
                                onChange={onChange}
                            />

                            <h1 className="py-2 text-lg  mt-3 text-left ">
                                Password :
                            </h1>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                class=" block  p-2.5  w-[365px]  bg-gray-700 border border-gray-600 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                // resize-y
                                placeholder="Type password here..."
                                
                                onChange={onChange}
                            />

                            <button
                                type="submit"
                                class="btn w-auto h-[25px] ml-[300px]  mt-3 box-content bg-footerColor hover:bg-PrimaryColorDarkHover"
                            >
                                {" "}
                                post
                            </button>
                            <p> {error}</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;