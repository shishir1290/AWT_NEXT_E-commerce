import React, { useEffect, useState } from 'react'
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import SingleMessage from './SingleReceiverMessage';
import SingleReceiverMessage from './SingleReceiverMessage';
import SingleSenderMessage from './SingleSenderMessage';
import SingleReceiver from './SingleReceiver';
import SingleSender from './SingleSender';
import axios from 'axios';


export default function ConversationBody({loggedInUserEmail, selectedConversation}) {
  // ekta  conversation e click korle shei conversation er shob message gula dekhabe .. 
  // so, shob message gula load korte hobe ..  show All Message of a conversation
   console.log("selected conversation id : ", selectedConversation?.id);
   const [conversationId, setConversationId] = useState(null);
   const [messageList, setMessageList] = useState([]); // from DB
   

   useEffect(() => {

    let id = selectedConversation?.id;
    console.log("id::::", id)
      if(id == undefined){
        setConversationId(3);
        console.log("conversationId in if ::: ",conversationId)
        //id = 3;
      }else if(id == null){
        setConversationId(3);
        console.log("conversationId in else if::: ",conversationId)
        //id = 3;
      }
      else{
        console.log("conversationId in else::: ",conversationId)
        setConversationId(selectedConversation?.id);
        //id = selectedConversation?.id;
      }
    // ekhon db theke selected conversation er shob message gula pull kore niye ashte hobe ..
    // jehetu conversation id ta amar kase ase 

    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;
    const loggedInUserEmail = JSON.parse(tokenString).user.userEmailAddress;

    const getConversationByConversationIDFromDB = async(token) =>{
      
        const response  = await axios.get(`http://localhost:3000/seller/message/showAllMessageOfAConversation/${conversationId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        );
        if(response.data){
          console.log(loggedInUserEmail)
          console.log("response.data from conversationBody : ", response.data);
          setMessageList(response.data);
        }
      
      };

      getConversationByConversationIDFromDB(token);
   
   
  },[conversationId])
  return (
    <>
    
      {/* conversationBody */}
      {/* // conversation top margin */}
      <div className='w-auto border-2 h-8 bg-PrimaryColorDark ' >
      </div>
      <div className='w-auto  overflow-hidden bg-PrimaryColorDark' style={{position:"relative", height:"300px", overflowBlock:"hidden", overflowY:"scroll"}} >
      {/* style={{width: "100%", overflowBlock:"hidden" }} */}
        {/* /////////////////design bug/////// */}

        {
          messageList.map((message, index) =>(
            <>
               {
                // message.senderEmailAddress == loggedInUserEmail ? (
                //     <SingleSender  message="sender 4" date="12/21/12"/>
                // ) :(
                //     <SingleReceiverMessage  message="sender 1" date="12/21/12"/>
                // )


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

        
        {/* <SingleSender  message="sender 4" date="12/21/12"/>
        
        <SingleReceiverMessage  message="sender 1" date="12/21/12"/> */}
        
        
        


        {/* /////////////////////////////// */}

      </div>
      <div>
        {/* Reply input form ..  */}

                <form>
                    <div class="flex">
                      {/* ekhane image, file submit korar bebostha thakte hobe  */}
                      <input type="file" id="file" style={{padding:"2px", width:"110px", height:"41px", borderRadius:"50px"}} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      
                      <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Text Here ..." required/>
                      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
      </div>
      
    </>
  )
}
