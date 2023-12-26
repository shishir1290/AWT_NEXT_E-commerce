import React from 'react'
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';

export default function SingleReceiverMessage({textAlign, message, date}) {
  return (
    <>
    {/* <p style={{textAlign: "left"}} design bug > */}
    <p style={{textAlign: {textAlign}}} >
            <div className=' flex relative gap-x-3' style={{marginTop:"25px"}}>
            {/* group flex*/}
            <div>
              <Image
                      className='rounded-full '
                      // float-left
                      src={LenovoPc124}
                      width={33}
                      // height={200}
                      quality={75} // default is 75
                      alt="Picture of user"
                />
            </div>
              
                <div className='group'>
                  <div style={{top:"-30px"}}  className='absolute invisible  group-hover:visible  ml-3 mt-1'>
                            {/* Date */}
                            {date}
                    </div>
                  <div style={{maxWidth: "200px"}} className='border-2 w-auto break-normal  bg-PrimaryColorDark p-1 rounded-lg ml-0'>
                      {/* Receiver's text */}
                      {message}
                  </div>
                  
                </div>
                
                
            </div>
        </p>
    </>
  )
}
