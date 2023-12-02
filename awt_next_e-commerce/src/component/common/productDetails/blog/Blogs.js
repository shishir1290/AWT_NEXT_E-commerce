import React from 'react'
import Blog from './Blog'

export default function Blogs() {
  return (
    <>
    
    <button className='btn btn-green-500'>Create Blog</button>
    <div className='flex flex-col '>
    <Blog/>
    <Blog/>
    <Blog/>
    <Blog/>
    </div>
    
    </>
  )
}
