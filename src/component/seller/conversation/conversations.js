import React, { useEffect, useState } from 'react'
import Conversation from './conversation'
import axios from 'axios';

export default function Conversations({loggedInUserEmail}) {
  const [conversationList, setConversationList] = useState([]); // from DB
  const [selectedConversation, setSelectedConversation] = useState(null);
  
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
        console.log("result", result.data)
        setConversationList(result.data);
      }
      
    }
    getConversationListFromDB();
  },[])

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <>
    {/* conversations */}
    {/* // ekhane onek gula Conversation Call korbo  */}
    <div className='flex flex-col scrollbar-dark scrollbar-rounded' style={{height:"400px",overflowBlock:"hidden", overflowY:"scroll"}}>
    
    {/* // conversationList map korte hobe  */}
    {
      conversationList.map((conversation, index) =>(
        <Conversation key={index}  onClick={() => handleConversationClick(conversation)}  conversation={conversation}/>
      ))
    }
    
    </div>
    
    </>
  )
}


{/* <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/> */}