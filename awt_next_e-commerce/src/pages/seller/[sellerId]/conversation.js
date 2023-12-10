import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/layout/mainCategory';
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Banner from '@/component/home/Banner';
import SellerProfile from '@/component/seller/profile/SellerProfile';
import Conversations from '@/component/seller/conversation/conversations';
import ConversationBody from '@/component/seller/conversation/conversationBody';
import axios from 'axios';
import Conversation from '@/component/seller/conversation/conversation';
import SingleSender from '@/component/seller/conversation/SingleSender';
import SingleReceiverMessage from '@/component/seller/conversation/SingleReceiverMessage';

export default function SellerProducts() {
  const inputRef = useRef(null);
  const lastMessageRef = useRef(null); // messageEndRef
  const router = useRouter();
  const {sellerId} = router.query;
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);

  // for conversation list
  const [conversationList, setConversationList] = useState([]); // from DB
  const [selectedConversation, setSelectedConversation] = useState([]);// null chilo 

  const [newMessage, setNewMessage] = useState(null);
  

  const [formData, setFormData] = useState({
    message: "",
    receiverEmail: "",
    senderEmail: "",
  });

  const [senderEmail, setSenderEmail] = useState(null);
  const [receiverEmail, setReceiverEmail] = useState(null);

  
  const [conversationId, setConversationId] = useState(null); // age null chilo
  const [messageList, setMessageList] = useState([]); // from DB


  //  useEffect number 1 // setLoggedInUserEmail
  useEffect(() => {
    // current logged in user email lagbe .. 
    const tokenString = localStorage.getItem('authForEcomerce');
    const loggedInUserEmail1 = JSON.parse(tokenString).user.userEmailAddress;
    setLoggedInUserEmail(loggedInUserEmail1);
    
    // lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }
    // inputRef.current.focus();
  },[])//messageList


  //  useEffect number 2 // getConversationListFromDB
  useEffect(() => {
    // db theke loggedInUser er shob conversation gula pull kore niye ashte hobe .. 

    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;
    const loggedInUserEmail = JSON.parse(tokenString).user.userEmailAddress;
    
    const getConversationListFromDB = async() =>{
      const result = await axios.get(`http://localhost:3000/seller/message/showAllConversation?loggedInUserEmail=${loggedInUserEmail}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(result.data){
        setConversationList(result.data);
      }
      
    }
    getConversationListFromDB();

    // lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }
    // inputRef.current.focus();
  },[selectedConversation])


  // for conversation list 
  const handleConversationClick = (conversation) => {
    //console.log("conversation clicked .. ", conversation);
    setSelectedConversation(conversation);
    setConversationId(conversation.conversationId); ////////////////////////////////////////////////
    // ekhane amra senderEmail and receiverEmail set korte hobe ..

    //🟢🟢🟢 console.log(conversation);
    //🟢🟢🟢 conversation.sellerEmailAddress is receiverEmail  
    //🟢🟢🟢 loggedin userEmail is senderEmail
    setSenderEmail(loggedInUserEmail);
    setReceiverEmail(conversation.sellerEmailAddress);

     lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }
    inputRef.current.focus();
    
  };

  // useEffect Number 3 // show all message of a conversation // getConversationByConversationIDFromDB
  useEffect(() => {
    let id = selectedConversation?.conversationId;
    // console.log("id from useEffect 1 :::: ", id)
    //console.log("id::::", id)
      if(id == undefined){
         setConversationId(4);
        
      }else if(id == null){
        setConversationId(4);
      }
      else{
        setConversationId(id); // 🟢🟢🟢🟢🟢
      }

    // ekhon db theke selected conversation er shob message gula pull kore niye ashte hobe ..
    // jehetu conversation id ta amar kase ase 

    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;
    const loggedInUserEmail = JSON.parse(tokenString).user.userEmailAddress;

    const getConversationByConversationIDFromDB = async(token,id) =>{
      
      if(conversationId){
        
        const response  = await axios.get(`http://localhost:3000/seller/message/showAllMessageOfAConversation/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        );
        if(response.data){
          setMessageList(response.data);
        }
     
      }
      
      };
      
        getConversationByConversationIDFromDB(token, conversationId);
      
      
      //lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }
      inputRef.current.focus();
   
  },[conversationId, newMessage])//messageList vuleo deowa jabe na  🔰🔰🔰🔰🔰

  const onChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // ei ta xoss way to play with form data
  }));
  }

  const handleMessageSubmit = async(e) =>{
    inputRef.current.focus();
    lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }

    e.preventDefault();
    
    formData.senderEmail = senderEmail;
    formData.receiverEmail = receiverEmail;
    
    e.target[1].value = ""; // form reset kore dibe ..  // but full form reset korle amader hobe na 
    // ekhon just text field ta reset korte hobe ..
    

    //console.log("formData from handleMessageSubmit: ", formData);

    // ekhon data amader ke db te post korte hobe .. axios er maddhome 
    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;


    const response = await axios.post('http://localhost:3000/seller/message/createNewMessage', formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    );

    if(response.data){
      console.log("successfully submit : ", response.data);
      setNewMessage(response.data);
      //router.push(`/seller/${sellerId}/conversation`);
    }

  }

  return (
    <>
    <br/>
    <br/>
    <br/>
    
      <div className=''>
      
        <SellerProfile/>
        <div className='mx-4 my-4 rounded-md bg-PrimaryColorDarkHover w-auto h-96 text-PureWhite'>
          {/* Conversation */}
          <div className='flex justify-center'>
              {/* conversation List */}
              <div className='w-[300px] rounded-md h-auto bg-PrimaryColorDark'>
                {/* ////////////////////////////////////// Conversations.js er code ta niye ashbo  ////////////// Start ///////////////////// */}
                <button className='btn btn-primary'>Create New Conversation</button>
                {/* <Conversations loggedInUserEmail={loggedInUserEmail}/> */}

                {/* conversations */}
                {/* // ekhane onek gula Conversation Call korbo  */}
                <div className='flex flex-col scrollbar-dark scrollbar-rounded' style={{height:"400px",overflowBlock:"hidden", overflowY:"scroll"}}>
                
                {/* // conversationList map korte hobe  */}
                {
                  conversationList.map((conversation, index) =>(
                    <>
                      <button   onClick={() => handleConversationClick(conversation)}>
                        <Conversation key={index}  conversation={conversation}/>               
                      </button>
                    </>
                    
                    ))
                }
                
                </div>

                {/* ////////////////////////////////////////////////////////////////////////////////////////////// END ////////////////// */}
              </div>
              {/* converation body */}
              <div className='w-[900px] rounded-md  h-96 bg-navbarColorGray'>
                {/* /////////////////////////////////////////////////////////////////////////////// Conversation Body Start//////////// */}
                {/* <ConversationBody loggedInUserEmail={loggedInUserEmail} selectedConversation={selectedConversation}/> */}

                  <div className='w-auto border-2 h-8 bg-PrimaryColorDark ' >
                  </div>
                  <div className='w-auto  overflow-hidden bg-PrimaryColorDark' style={{position:"relative", height:"300px", overflowBlock:"hidden", overflowY:"scroll"}} >
                  
                    {
                      messageList.map((message, index) =>(
                        <>
                          {
                            
                            message.senderEmail == loggedInUserEmail ? (
                                
                                <SingleSender  message={message.message} date={message.timeStamps}/>
                            ) :
                              message.receiverEmail == loggedInUserEmail ? (
                                <SingleReceiverMessage   message={message.message} date={message.timeStamps}/>
                            ):(
                              <></>
                            )

                          }
                        </>
                      ))
                    }

                    {/* // below the last message  */}
                    <div style={{width:"2px", height:"2px"}} ref={lastMessageRef}>.</div>

                  </div>
                  <div>
                          {/* // ekhane logged in user selected conversation er moddhe message send korbe  */}
                            <form noValidate onSubmit={handleMessageSubmit}>
                                <div class="flex">
                                  <input type="file" id="file"  style={{padding:"2px", width:"110px", height:"41px", borderRadius:"50px"}} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                  
                                  {
                                    //console.log(senderEmail, receiverEmail)
                                  }
                                  <input ref={inputRef} type="text" id="message" name='message'onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Text Here ..." required/>
                                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </div>
                            </form>
                  </div>
                  
                {/* /////////////////////////////////////////////////////////////////////////////// Conversation Body End //////////// */}
              </div>
          </div>
        </div>
      </div> 
    </>
    
  )
}

