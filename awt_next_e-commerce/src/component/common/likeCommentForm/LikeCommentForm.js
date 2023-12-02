import React from 'react'
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi'

export default function LikeCommentForm() {
  return (
    <>
    <div className='flex justify-between '>
      <div className='flex mt-3 ml-2'>
        {/* like dislike buttons  */}
        <button className='flex ' style={{}}>
                    <BiLike />
                    {/* <BiSolidLike /> */}

                       </button>
                       <span className=''>  5</span>
                    <button className='flex ml-2'>
                    <BiDislike />
                    {/* <BiSolidDislike /> */}
                    
                       </button>
                       <span className=''>  5</span>
      </div>
    <form>
        <div class="flex">
          {/* ekhane image, file submit korar bebostha thakte hobe  */}
          <input type="file" id="file" style={{padding:"2px", width:"30px", height:"41px", borderRadius:"50px"}} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>           
          <input type="name" id="name" style={{width:"210px"}} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Text Here ..." required/>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </div>
      
    </>
  )
}
