import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/layout/mainCategory';
import { MdDelete, MdOutlineLocationCity } from "react-icons/md";
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

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = ()=> {
      setRefresh(!refresh);
  }
  

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
  },[selectedConversation, refresh])


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


    if(
      conversationId
    ){
      inputRef.current.focus();
      lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }
  
    }

    //  lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }
    // inputRef.current.focus();
    
  };

  // useEffect Number 3 // show all message of a conversation // getConversationByConversationIDFromDB
  useEffect(() => {
    let id = selectedConversation?.conversationId;
    // console.log("id from useEffect 1 :::: ", id)
    //console.log("id::::", id)
      if(id == undefined){
         //setConversationId(4);
         setConversationId(null);
      }else if(id == null){
        //setConversationId(4);
        setConversationId(null);
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
      if(
        conversationId
      ){
        inputRef.current.focus();
       // lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }
    
      }
      // inputRef.current.focus();
   
  },[conversationId, newMessage])//messageList vuleo deowa jabe na  🔰🔰🔰🔰🔰

  const onChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // ei ta xoss way to play with form data
  }));
  }

  
  const handleMessageSubmitForNewConversation = async(e) =>{
    // inputRef.current.focus();
    // lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }

    e.preventDefault();

    setTimeout(() => {
      setRefresh(!refresh);
    }, 1000);

    

    setSenderEmail(loggedInUserEmail);
    formData.senderEmail = senderEmail;
    formData.senderEmail = loggedInUserEmail;
    formData.receiverEmail = e.target[0].value;
    formData.message = e.target[1].value;

    // console.log("formData.senderEmail", formData.senderEmail)
    // console.log("e.target.value[0] email : ", e.target[0].value)
    // console.log("e.target.value[0] message : ",e.target[1].value)

    
    e.target[0].value = "";
    e.target[1].value = ""; // form reset kore dibe ..  // but full form reset korle amader hobe na 
    
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
      
    }

  }

  
  const handleMessageSubmit = async(e) =>{
    if(
      conversationId
    ){
      inputRef.current.focus();
      lastMessageRef.current.scrollIntoView({ behavior:"smooth" });//{ behavior: "smooth" }
  
    }
    
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

  const handleDelete = async(conversationId) => {
    // console.log("delete clicked");
    const response = await axios.delete(`http://localhost:3000/seller/message/deleteConversationByConversationId/${conversationId}`,{
      headers:{
        Authorization: `bearer ${JSON.parse(localStorage.getItem('authForEcomerce')).accessToken}`
      }
    })

    if(response.data){
      
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
      
     //router.push("/seller/14/review"); 
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
                
                
                {/* <button className='btn btn-primary'>Create New Conversation</button> */}
                {/* ////////////////////// Create New Conversation Modal Start /////////////////// */}
                
                <button className="btn m-3" onClick={()=>document.getElementById('my_modal_1').showModal()}>Create New Conversation</button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">X</button>
                      </form>
                    </div>
                  {/* ////////////////////////////////////////////////// */}
                  {/* onSubmit={handleSubmitNewProduct} */}
                  <form className="modal-action flex flex-col"  noValidate method="dialog" onSubmit={handleMessageSubmitForNewConversation} >
                   

                    <div class="mb-6">
                      <label for="Search" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search By Email Address</label>
                      <input type="text" onChange={onChange} name='Search' id="Search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write lowest quantity to stock here..." />
                      
                      <div>
                          

                      </div>

                      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                      <input type="text" onChange={onChange} name='message' id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write lowest quantity to stock here..." />
                    
                    </div>
                    
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


                {/* ////////////////////// Create New Conversation Modal End /////////////////// */}
                {/* conversations */}
                {/* // ekhane onek gula Conversation Call korbo  */}
                <div className='flex flex-col scrollbar-dark scrollbar-rounded' style={{height:"300px",overflowBlock:"hidden", overflowY:"scroll"}}>
                
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

                  <div className='w-auto border-2 h-8 bg-PrimaryColorDark  flex justify-end' >
                 {
                  conversationId ? (
                    <>
                    <button onClick={() => handleDelete(conversationId)} className='mr-4'>
                      <MdDelete style={{fontSize:"25px", backgroundColor:"lightBlue" ,color: "purple", borderRadius: "5px"}}/>
                    </button>
                    </>
                  ):(<>
                  </>)
                 }
                  
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
                            
                            {
                              conversationId ? (
                                <>
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
                                </>
                                
                              ):(
                                <>
                                </>
                              )
                            }
                            
                  </div>
                  
                {/* /////////////////////////////////////////////////////////////////////////////// Conversation Body End //////////// */}
              </div>
          </div>
        </div>
      </div> 
    </>
    
  )
}

