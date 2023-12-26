import React from 'react'
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';


export default function Conversation({conversation}) {
  const {id, sellerName, sellerEmailAddress, lastMessage} = conversation;
  // last message er time o send korte hobe back-end theke  🔰🔰
  // seller er image send korte hobe back-end theke 🔰🔰
  return (
    <>
        {/* conversation */}
        <div className='border-2 h-52'>
          <a>
              <div className='flex m-3'>

              <Image
                className='rounded-md '
                src={LenovoPc124}
                width={30}
                // height={200}
                quality={75} // default is 75
                alt="Picture of user"
              />
              <div>
                <h1 className='ml-3 '>{sellerName + "--"+id}</h1>
              </div>
              </div>

              <div className='rounded-md  w-auto h-auto bg-PrimaryColorDark'>
                      {lastMessage}
                         {/* .....time.. */}
              </div>
                
          </a>
           
        </div>
        
    </>
  )
}
