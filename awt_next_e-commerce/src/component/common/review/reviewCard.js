import Image from 'next/image'
import React from 'react'
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import { BiLike, BiSolidLike  } from "react-icons/bi";
import { BiDislike, BiSolidDislike  } from "react-icons/bi";




export default function ReviewCard() {
  return (
    <>
      <div id='reviewBody' style={{marginBottom:"10px"}} className='relative rounded-lg p-4 w-auto h-auto bg-PrimaryColorDarkHover border-2'>
                <div >
                  {/* // user image  */}
                  <div className='flex'>

                  <Image
                    className='rounded-full'
                    src={LenovoPc124}
                    width={50}
                    // height={200}
                    quality={75} // default is 75
                    alt="Picture of user"
                  />
                  <div>
                    
                     <h1 className='ml-3'>Mohammad Bin Ab. Jalil Sheakh</h1>
                  
                      
                  </div>
                  </div>

                  <div style={{marginLeft:"60px"}} className='rounded-md relative left-[35px] top-[-15px] ml-9 w-96 h-auto bg-PrimaryColorDark'>
                          Review Body...........................................
                          .....................................................
                          .....................................................
                          .....................................................
                  </div>
                  <div className='flex gap-3 mt-2'>
                    {/* like dislike buttons  */}
                    <button className='btn'>
                    <BiLike />
                    <BiSolidLike />

                       5</button>
                    <button className='btn'>
                    <BiDislike />
                    <BiSolidDislike />
                       5</button>

                    {/* // ekhane reply er input form thakbe ..  */}
                    {/* /////////////////flowbite/////////////////////// */}
                    <form className='flex  gap-3'>
                      
                        <input  type="text" id="reviewReply" class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Give Reply..." required/>
                      
                      
                      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                    {/* //////////////////////////////////////// */}
                  </div>
                  <div>
                    {/* // if any reply found ! then show this div */}
                    {/* // accending order e show korbe */}
                  </div>
                  
                </div>
                
              </div>
    </>
  )
}
