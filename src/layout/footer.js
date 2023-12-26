import React from 'react'

export default function Footer() {
  return (
    <>
      <div className='w-auto mt-10 h-[200px] bg-gray-400 flex flex-wrap justify-evenly content-center  gap-3'>
        <ul className='text-white'> 
          <li>About Us</li>
          <li>Contact Us</li>
          <li>FAQ</li>
          <li>Returns and Exchanges</li>
        </ul>
        <ul className='text-white'>
          <li>Shipping Information</li>
          <li>Privacy Policy</li>
          <li>Terms and Conditions</li>
          <li>Careers</li>
        </ul>
        <ul className='text-white'>
          <li>Customer Support/Service</li>
          <li>Help Center</li>
          <li>Order Tracking</li>
          <li>Product Care Instructions</li>
        </ul>
        <ul className='text-white'>
          <li>Social Media Links</li>
          <li>Payment Methods</li>
          
        </ul>
      </div>
    </>
  )
}
