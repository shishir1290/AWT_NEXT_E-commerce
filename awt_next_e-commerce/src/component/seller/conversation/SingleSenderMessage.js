import React from 'react'
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';


export default function SingleSenderMessage({textAlign, message, date}) {
  return (
    <>
    
    <p className='relative' style={{textAlign: {textAlign}}}>
    {/* border-2 */}
      <div className='relative'>
      <div className='group  '>
      {/* border-2 */}
            <div style={{right:"55px", top: "-20px"}}  className='border-2 absolute invisible  group-hover:visible'>
                  {date}
                 
            </div>
            <div  className='border-2  absolute w-auto bg-PrimaryColorDark p-1 rounded-lg' style={{ right:"55px", top: "3px", maxWidth:"200px"}}>

                {message}
            </div>
        </div>

            <Image
            className='rounded-full absolute border-2'
            style={{right:"10px"}}
            src={LenovoPc124}
            width={33}
            quality={75}
            alt="Picture of user"
          />
      </div>
        
           
        </p>


    </>
  )
}
