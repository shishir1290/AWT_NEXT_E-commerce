import React from 'react'
import LenovoPc124 from '../../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import logo from "../../../../../public/assets/icons/home/logo.png";
import LikeCommentForm from '../../likeCommentForm/LikeCommentForm';

export default function Blog() {
  return (
    <>
      {/* 
      
                // Customer can create blog ... 
                // Seller also can create blog...
      
      */}

      {/* //this is blog card */}
      <div className='border-2 mx-auto mt-4 rounded-lg' style={{width:"400px", height:"400px"}}>
      
      <div className='p-3 overflow-hidden mt-1' style={{height:"350px", overflowBlock:"hidden", overflowY:"scroll"}}>
          {/* image */}
          <Image
                src={LenovoPc124}
                // width={200}
                className='mx-auto rounded-lg'
                //object-fill
                height={200}
                quality={75} // default is 75
                alt="Picture of banner"
                />
        {/* user image blog title */}
        <div className='flex ml-3 mt-4'>
          <div>
          {/* //user image */}
          <Image
                    src={logo}
                    width={40}
                    // height={200}
                    className='rounded-full'
                    quality={75} // default is 75
                    alt="Logo"
                />
          </div>
          <div className='p-2 flex flex-col'>
          {/* //blog title */}
          <div>
          Awsome Lenovo Pc ! Best Deal
          </div>
          <div>
            {/* userName */}
            - Mohammad Sheakh
          </div>
          </div>
        </div>
        <div className='p-3' >
          {/* body */}
          Body .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................
          .......................

        </div>
        
    </div>

    <div>
            {/* like, dislike comment box */}
            <LikeCommentForm/>
        </div>
        
        
      </div>
    </>
  )
}
