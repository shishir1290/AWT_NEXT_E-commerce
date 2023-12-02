import React from 'react'
import Conversation from './conversation'

export default function Conversations() {
  return (
    <>
    {/* conversations */}
    {/* // ekhane onek gula Conversation Call korbo  */}
    <div className='flex flex-col scrollbar-dark scrollbar-rounded' style={{height:"400px",overflowBlock:"hidden", overflowY:"scroll"}}>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    </div>
    
    </>
  )
}
