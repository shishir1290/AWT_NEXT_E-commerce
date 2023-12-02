// components/SingleSenderMessage.js

import React from 'react';
import Image from 'next/image';
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';

const SingleSender = ({  message, date }) => {
  return (
    <>
    <div style={{width: "auto", height:"auto" , marginBottom:"23px"}} class="flex flex-row justify-between bg-PrimaryColorDark ">
      <div className='justify-self-start'></div>
      <div className='justify-self-end'>
        {/* ////////////////////////////////// */}
        <div className='flex'>
          <div className='group'>
            <div className='border-2 relative  w-auto bg-PrimaryColorDark p-1 rounded-lg'>
            {message}
            </div>
            <span className='absolute invisible  group-hover:visible'>
              {date}
            </span>
          </div>
          
        
        <Image
            className='rounded-full  border-2'
            style={{right:"10px"}}
            src={LenovoPc124}
            width={33}
            quality={75}
            alt="Picture of user"
          />
        </div>
        
        {/* ////////////////////////////////////// */}
      </div>
    </div>
    </>
  );
};

export default SingleSender;